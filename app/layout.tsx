import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import InputForm from "@/components/InputForm";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";

const satoshi = localFont({
  src: "/fonts/Satoshi.ttf",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "SpotTheScam",
  description: "App to detect fake websites and app store listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} font-sans w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="h-screen w-full flex flex-col">
              <div className="w-full flex justify-between p-4">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={200}
                    height={36}
                    className="dark:hidden"
                  />
                  <Image
                    src="/images/logo-dark.png"
                    alt="dark-logo"
                    width={200}
                    height={36}
                    className="hidden dark:block"
                  />
                </Link>
                <ModeToggle />
              </div>
              <div className="flex-1 flex flex-col items-center gap-16 p-10">
                {/* <HeroSection /> */}
                <InputForm />
                <div className="flex-1">{children}</div>
                <div className="text-sm text-gray-500">
                  Made in 🏖️ by{" "}
                  <a
                    href="https://x.com/_nikhilsheoran"
                    target="_blank"
                    className="underline"
                  >
                    Nikhil
                  </a>
                  , Utkarsh and Mohak.
                </div>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
