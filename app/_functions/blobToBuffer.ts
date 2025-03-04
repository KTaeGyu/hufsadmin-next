import OracleDB from "oracledb";

export async function bolbToBuffer(blob: OracleDB.Lob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let chunks: Buffer[] = [];
    blob.on("data", (chunk: Buffer) => chunks.push(chunk));
    blob.on("end", () => resolve(Buffer.concat(chunks)));
    blob.on("error", (err: Error) => reject(err));
  });
}

export function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer | SharedArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
