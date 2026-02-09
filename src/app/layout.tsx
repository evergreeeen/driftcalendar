import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Drift Calendar - Календарь дрифт-мероприятий",
  description: "Расписание дрифт-мероприятий: RDS GP, RDS Open, САТЮКАП, АДМ и другие серии",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Nav />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
