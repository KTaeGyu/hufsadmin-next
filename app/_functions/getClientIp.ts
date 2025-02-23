export default function getClientIp(req: Request) {
  let ip = req.headers.get("x-forwarded-for");

  // x-real-ip 까지 체크 후 ip 가져오기
  if (ip) {
    ip = ip.split(",")[0].trim();
  } else {
    ip = req.headers.get("x-real-ip") || null;
  }

  // IPv6 접두사 제거
  if (ip && ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  return ip;
}
