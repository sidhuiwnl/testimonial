import type { Metadata } from "next";

import "./globals.css";
import Sidebar from "@/components/Dashboard";
import BreadcrumbComp from "@/components/Crumbs";
import { Merriweather, Lora } from "next/font/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Collect the reviews",
  description:
    "Collect your reviews with ease and speed, and share them with the world",
};

const Lol = Lora({
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
      <body className={`${Lol.className} antialiased flex`}>{children}</body>
    </html>
  );
}
