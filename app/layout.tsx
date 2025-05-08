import type { Metadata } from "next";

import "./globals.css";

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
