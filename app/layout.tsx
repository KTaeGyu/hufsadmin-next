import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import "./_assets/css/common.css";
import "./_assets/css/globals.css";

export const metadata: Metadata = {
  title: "HUFS-ADMIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      {children}
    </html>
  );
}
