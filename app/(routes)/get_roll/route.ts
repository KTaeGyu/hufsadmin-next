import cache from "@/app/_lib/cache";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { RollMenuObjectItem } from "@/app/api/init/route";
import { NextResponse } from "next/server";
import { Connection } from "oracledb";
import getThisAdminRollSql from "./_sql/getThisAdminRollSql.sql";

export async function POST() {
  let connection: Connection | null = null;
  try {
    // Load Session
    console.log("Loading Session...");
    const session = await getSession();

    if (session.admin_id === undefined || session.admin_id.length <= 0) {
      throw new Error("세션이 만료되었습니다.", { cause: 401 });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection().catch((err) => {
      throw new Error("DB 연결에 실패하였습니다.", { cause: 500 });
    });

    // Get Roll
    console.log("Trying To Execute...");
    const dbResult = await connection
      .execute<FixedArray<string, 5>>(getThisAdminRollSql, [session.admin_id])
      .catch(() => {
        throw new Error("에러가 발생했습니다. 관리자에게 문의 바랍니다.", { cause: 303 });
      });

    // Load Cache
    const rollMenuObjectArray = cache.getRollMenuObjectArray() || [];
    const myRollMenuObjectArray: RollMenuObjectItem[] = [];

    if (dbResult.rows) {
      for (let i = 0; i < dbResult.rows.length; i++) {
        for (let j = 0; j < rollMenuObjectArray.length; j++) {
          if (rollMenuObjectArray[j].roll_id == dbResult.rows[i][2]) {
            myRollMenuObjectArray.push(rollMenuObjectArray[j]);
          }
        }
      }
    }

    return NextResponse.json({ status: "SUCCESS", value: myRollMenuObjectArray });
  } catch (err) {
    console.error(err);

    if (!(err instanceof Error)) {
      return NextResponse.json({ status: "FAIL", value: "" });
    }

    if (err.cause === 500) {
      return NextResponse.json({ status: "FAIL", value: "" });
    } else if (err.cause === 401) {
      const response = NextResponse.json({ status: "SESSION EXPIRED" });
      response.cookies.set("message", err.message, { path: "/", httpOnly: false });

      return response;
    } else if (err.cause === 303) {
      return NextResponse.redirect(new URL("/"), err.cause);
    }

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
