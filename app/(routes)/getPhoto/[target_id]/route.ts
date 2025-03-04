import { bolbToBuffer } from "@/app/_functions/blobToBuffer";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";
import OracleDB, { Connection } from "oracledb";
import getPhotoSql from "./_sql/getPhotoSql.sql";

export async function GET(req: Request, { params }: { params: Promise<{ target_id: string }> }) {
  let connection: Connection | null = null;
  try {
    const { target_id } = await params;

    // Load Session
    console.log("Loading Session...");
    const session = await getSession();

    if (session.admin_id === undefined) {
      throw new Error("NO_SESSION_ID", { cause: 401 });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection().catch(() => {
      throw new Error("CANNOT_CONNECT_DB", { cause: 500 });
    });

    // 사진 가져오기
    console.log("Trying To Execute...");
    const dbResult = await connection.execute<FixedArray<string, 1>>(getPhotoSql, [target_id, target_id, target_id, target_id, target_id]);
    if (!dbResult.rows || dbResult.rows.length === 0 || !dbResult.rows[0]) {
      throw new Error("NO_PHOTO", { cause: 404 });
    }

    // 사진 변환
    const blob = dbResult.rows[0][0] as unknown;
    const buffer = await bolbToBuffer(blob as OracleDB.Lob);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.log(err);
    if (!(err instanceof Error) || err.cause === 400) {
      return NextResponse.json({});
    }

    if (err.cause === 401) {
      return NextResponse.json({});
    } else if (err.cause === 404) {
      return NextResponse.json({ status: "success", detail: "no photo" });
    } else if (err.cause === 500) {
      return NextResponse.json({ status: "fail", detail: "network error" });
    }

    return NextResponse.json({});
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
