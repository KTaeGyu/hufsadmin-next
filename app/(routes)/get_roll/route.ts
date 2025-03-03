import cache from "@/app/_lib/cache";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
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
      throw new Error("session expired", { cause: 401 });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // Get Roll
    console.log("Trying To Execute...");
    const dbResult = await connection.execute<FixedArray<string, 5>>(getThisAdminRollSql, [session.admin_id]);

    // Load Cache
    const rollMenuObjectArray = cache.getRollMenuObjectArray();
    if (!rollMenuObjectArray) {
      throw new Error("캐싱된 데이터가 없습니다.", { cause: 500 });
    }
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
