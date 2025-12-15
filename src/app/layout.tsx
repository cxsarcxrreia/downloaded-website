import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Downloaded Studios",
  description: "You imagine, we craft for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} font-mono antialiased bg-black text-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
