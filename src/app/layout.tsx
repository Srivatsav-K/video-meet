import { Toaster } from "@/components/ui/toaster";
import ClerkAuthProvider from "@/providers/ClerkAuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkAuthProvider>
        <body className={`${inter.className} bg-dark-2 `}>
          {children}
          <Toaster />
        </body>
      </ClerkAuthProvider>
    </html>
  );
}
