import { getPool } from "@/app/_lib/oracledb";
import { sessionOptions } from "@/app/_lib/session";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { Connection } from "oracledb";
import getThisAdminRollSql from "./_sql/getThisAdminRollSql.sql";

export async function POST(req: Request) {
  let connection: Connection | null = null;
  try {
    // Load Session
    console.log("Loading Session...");
    const response = NextResponse.next();
    const session = await getIronSession<AppSession>(req, response, sessionOptions);

    if (session.admin_id === undefined || session.admin_id.length <= 0) {
      throw new Error("Error: session expired.", { cause: "SESSION EXPIRED" });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // Get Roll
    console.log("Trying To Execute...");
    const dbResult = await connection.execute(getThisAdminRollSql, [session.admin_id]);

    const myRollMenuObjectArray = [1];

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
