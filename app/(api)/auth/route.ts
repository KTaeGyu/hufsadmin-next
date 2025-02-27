import getClientIp from "@/app/(views)/_functions/getClientIp";
import getCurrentTimeString from "@/app/(views)/_functions/getCurrentTimeString";
import { getPool } from "@/app/_lib/oracledb";
import { sessionOptions } from "@/app/_lib/session";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { Connection } from "oracledb";
import getGlobalCounselInternMember from "./_sql/getGlobalCounselInternMember.sql";
import getSeflagAU from "./_sql/getSeflagAU.sql";
import getSeoulCounselInternMember from "./_sql/getSeoulCounselInternMember.sql";
import insertLoginRecordSql from "./_sql/insertLoginRecordSql.sql";

interface PostRequestBody {
  id: string;
  password: string;
}

export async function POST(req: Request) {
  let connection: Connection | null = null;
  try {
    const body: PostRequestBody = await req.json();
    const { id, password } = body;
    const ip = getClientIp(req);

    // Data Validation Check
    if (!id || !password) {
      return NextResponse.json({ status: "FAIL", value: "" });
    }

    // Load Session
    console.log("Loading Session...");
    const response = NextResponse.next();
    const session = await getIronSession<AppSession>(req, response, sessionOptions);

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // 로그인 정보
    let adminName = "";
    let deptName = "";
    let userName = "";

    // 로그인 시도
    console.log("Trying To Execute...");
    // Ex1) 광역버스관리자
    const { PUBLIC_TRAFFIC_MANAGER_ID, PUBLIC_TRAFFIC_MANAGER_PW } = process.env;
    if (id === PUBLIC_TRAFFIC_MANAGER_ID && password === PUBLIC_TRAFFIC_MANAGER_PW) {
      adminName = "광역버스관리자";
      deptName = "총괄지원팀";
      userName = "광역버스";
    }
    // Ex2) 상담센터 인턴상담원
    //      상담센터의 인턴상담원은 아이디 앞에 G 혹은 S가 붙는다.
    else if (id[0] === "G" || id[0] === "S") {
      const sql = id[0] === "G" ? getGlobalCounselInternMember : getSeoulCounselInternMember;

      const dbResult = await connection.execute<[string, string]>(sql, [id, password]);
      // 로그인 정보가 없을 경우
      if (dbResult.rows?.length !== 1) {
        return NextResponse.json({ status: "SUCCESS", value: "INVALID_ID_PASSWORD" });
      }
      // 성공
      adminName = dbResult.rows[0][0];
      deptName = "상담센터";
      userName = adminName;
    }
    // 일반 사용자
    else {
      const dbResult = await connection.execute<[string, string, string]>(getSeflagAU, [id, password]);

      // 로그인 정보가 없을 경우
      if (dbResult.rows?.length !== 1) {
        return NextResponse.json({ status: "SUCCESS", value: "INVALID_ID_PASSWORD" });
      }
      // 권한이 없을 경우
      const seFlag = dbResult.rows[0][0];
      if (seFlag !== "1" && seFlag !== "2") {
        return NextResponse.json({ status: "SUCCESS", value: "NO_RIGHT" });
      }
      // 성공
      adminName = dbResult.rows[0][1];
      deptName = dbResult.rows[0][2];
      userName = adminName;
    }

    // 세션 설정
    console.log("Setting Session...");
    session.admin_id = id;
    session.admin_name = adminName;
    session.dept_name = deptName;
    session.recent_access_ip = ip;
    session.recent_access_time = getCurrentTimeString();

    // 로그인 정보 저장
    console.log("Insert Login Record...");
    await connection.execute(insertLoginRecordSql, [id, userName, session.recent_access_time, ip], { autoCommit: true });

    return NextResponse.json({ status: "SUCCESS", value: "AUTHENTICATED" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ status: "FAIL", value: "" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
