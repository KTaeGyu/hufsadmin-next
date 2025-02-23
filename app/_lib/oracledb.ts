import oracledb from "oracledb";

let pool: oracledb.Pool | null = null;

export async function getPool() {
  // 등록된 Pool 반환
  if (pool) {
    return pool;
  }

  // Pool 등록
  pool = await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
    poolMin: 10,
    poolMax: 20,
    poolIncrement: 5,
  });
  return pool;
}
