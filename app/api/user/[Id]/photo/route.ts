import { bolbToBuffer } from "@/app/_functions/blobToBuffer";
import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";
import OracleDB, { Connection } from "oracledb";
import getPhotoSql from "./_sql/getPhotoSql.sql";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  let connection: Connection | null = null;
  try {
    const { id } = await params;

    // Load Session
    console.log("Loading Session...");
    const session = await getSession();

    if (session.admin_id === undefined) {
      throw new Error("로그인 정보가 없습니다.", { cause: 401 });
    }

    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // 사진 가져오기
    console.log("Trying To Execute...");
    const dbResult = await connection.execute<FixedArray<string, 1>>(getPhotoSql, { id });
    if (!dbResult.rows || dbResult.rows.length === 0 || !dbResult.rows[0]) {
      throw new Error("사진 정보가 없습니다.", { cause: 204 });
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
    if (!(err instanceof Error)) {
      return NextResponse.json({ message: "에러가 발생했습니다." }, { status: 500 });
    }

    if (typeof err.cause === "number") {
      return NextResponse.json({ message: err.message }, { status: err.cause });
    }

    return NextResponse.json({ message: "에러가 발생했습니다." }, { status: 500 });
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
