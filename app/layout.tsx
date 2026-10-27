import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-legal-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-legal-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TURÓ",
  description:
    "Turó connects movement, nutrition, recovery and community to help everyday habits work better together.",
};

export const viewport: Viewport = {
  themeColor: "#f4f2ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
