import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";

export const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Api Evolution",
  description: "API Evolution: GraphQL vs REST (and Beyond)",
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
