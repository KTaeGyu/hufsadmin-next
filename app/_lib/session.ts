import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface AppSession {
  admin_id: string;
  admin_name: string;
  dept_name: string;
  recent_access_ip: string | null;
  recent_access_time: string;
}

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "hufs-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  return await getIronSession<AppSession>(await cookies(), sessionOptions);
}
