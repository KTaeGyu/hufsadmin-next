import cache from "@/app/_lib/cache";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";
import { Connection } from "oracledb";
import getThisAdminRollSql from "./_sql/getThisAdminRollSql.sql";

export async function GET() {
  let connection: Connection | null = null;
  try {
    // Load Session
    console.log("Loading Session...");
    const { admin_id } = await getSession();

    if (admin_id === undefined || admin_id.length <= 0) {
      throw new Error("Error: session expired.", { cause: "SESSION EXPIRED" });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // Get Roll
    console.log("Trying To Execute...");
    const dbResult = await connection.execute<FixedArray<string, 5>>(getThisAdminRollSql, { admin_id });

    // Load Cache
    const rollMenuObjectArray = cache.getRollMenuObjectArray();
    if (!rollMenuObjectArray) {
      throw new Error("캐싱된 데이터가 없습니다.", { cause: 500 });
    }
    const rollIdSet = new Set(dbResult.rows?.map((row) => row[2])); // Set을 활용한 최적화
    const myRollMenuObjectArray = rollMenuObjectArray.filter((rollMenuObject) => rollIdSet.has(rollMenuObject.roll_id));

    return NextResponse.json({ status: "SUCCESS", value: myRollMenuObjectArray });
  } catch (err) {
    console.error(err);
    if (!(err instanceof Error)) {
      return NextResponse.json({ status: "FAIL", value: "" });
    }

    if (err.cause === "SESSION EXPIRED") {
      return NextResponse.json({ status: err.cause });
    } else {
      return NextResponse.json({ status: err.cause, value: "" });
    }
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
