import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "DevExplorer",
  description: "Developer Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}