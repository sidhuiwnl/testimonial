import type { Metadata } from "next";

import "./globals.css";

import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Collect the reviews",
  description:
    "Collect your reviews with ease and speed, and share them with the world",
};

const Rob = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Rob.className} antialiased flex`}>{children}</body>
    </html>
  );
}
