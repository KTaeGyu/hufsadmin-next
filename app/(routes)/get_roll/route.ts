import { Roll } from "@/app/(views)/main/_layout/LeftMenu";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";
import { Connection } from "oracledb";
import getThisAdminRollSql from "./_sql/getThisAdminRollSql.sql";

export async function POST(req: Request) {
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
    connection = await pool.getConnection();

    // Get Roll
    console.log("Trying To Execute...");
    const bindParams = { id: session.admin_id };
    const dbResult = await connection.execute<FixedSizeArray<string, 5>>(getThisAdminRollSql, bindParams);

    const rolls: Roll[] = dbResult.rows?.map((row) => ({ rollId: row[0], rollName: row[1] })) || [];

    return NextResponse.json({ rolls }, { status: 200 });
  } catch (err) {
    console.error(err);

    if (!(err instanceof Error)) {
      return NextResponse.json({ message: "에러가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ message: err.message }, { status: (err.cause as number) || 500 });
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
