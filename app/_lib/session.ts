export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "hufs-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
