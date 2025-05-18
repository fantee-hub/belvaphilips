import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import ScrollTop from "@/components/ScrollToTop";
import Header from "@/components/admin/layout/Header";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
});
const gilroy = localFont({
  src: [
    {
      path: "../fonts/Gilroy/Gilroy-ExtraBold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Gilroy/Gilroy-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "BelvaPhilips Imagery - Studio Quality Photography",
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
        className={`${inter.className} antialiased ${gilroy.variable}`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        <ScrollTop />
        <Header />
        <Head>
          <meta
            name="google-site-verification"
            content="uynsFH9sN28k9U4E1kmQ--cCkUvIH_PN_ouHwBTl3Ew"
          />
        </Head>
        <main>{children}</main>
      </body>
    </html>
  );
}
