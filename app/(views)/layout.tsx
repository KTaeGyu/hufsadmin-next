import { QueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import "./_assets/css/common.css";
import "./_assets/css/globals.css";
import Providers from "./_contexts/Providers";

interface LayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "HUFS-ADMIN",
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
