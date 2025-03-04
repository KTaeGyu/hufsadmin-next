import { getPool } from "@/app/_lib/oracledb";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";
import OracleDB, { Connection } from "oracledb";
import getPhotoSql from "./_sql/getPhotoSql.sql";

OracleDB.fetchAsBuffer = [OracleDB.BLOB];

export async function GET(_: Request, { params }: { params: { admin_id: string } }) {
  let connection: Connection | null = null;
  try {
    const { admin_id } = params;

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
    console.log(`Trying To Execute: admin_id=${admin_id}`);
    const dbResult = await connection.execute<{ PHOTO: Buffer | null }>(
      getPhotoSql,
      { admin_id },
      { outFormat: OracleDB.OUT_FORMAT_OBJECT }
    );

    const photoBuffer = dbResult.rows ? dbResult.rows[0].PHOTO || null : null;

    if (!photoBuffer) {
      return NextResponse.json({ message: "사진 정보가 없습니다." }, { status: 204 });
    }

    return new Response(photoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": photoBuffer.length.toString(),
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
