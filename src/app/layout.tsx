import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DevExplorer — Developer Intelligence Platform",
  description: "Search and discover GitHub repos, developers, articles, news and Stack Overflow questions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {children}
            </div>
            <Toaster position="bottom-right" richColors />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}