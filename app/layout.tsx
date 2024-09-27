import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "/fonts/Satoshi.ttf",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Spot The Scam",
  description: "App to detect fake websites and app store listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} font-sans w-screen overflow-hidden bg-[#F9F9F9]`}
      >
        {children}
      </body>
    </html>
  );
}
