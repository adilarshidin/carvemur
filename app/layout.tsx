import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carvemur 1981 S.L. | Carbón Vegetal en Murcia",
  description:
    "Carbón vegetal nacional e importado desde 1981. Servimos barbacoas, parrillas y hostelería en Murcia con un producto que arde limpio y dura horas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
