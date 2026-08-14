import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge",
  description: "Teach once. Delegate forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}