import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/authProvider";
import { Toaster } from 'sonner';


export const metadata: Metadata = {
  title: "CodePass - Admin",
  description: "CodePass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
