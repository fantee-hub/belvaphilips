import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BelyaPhilips Imagery - Studio Quality Photography",
  description: "Studio quality photography made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
