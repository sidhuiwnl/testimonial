import type { Metadata } from "next";

import "./globals.css";

import { Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Collect the reviews",
  description:
    "Collect your reviews with ease and speed, and share them with the world",
};

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto_mono.className} antialiased flex`}>
        {children}
      </body>
    </html>
  );
}
