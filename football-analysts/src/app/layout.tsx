import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://football-analysts.example"),
  title: {
    default: "Football Analysts",
    template: "%s • Football Analysts",
  },
  description: "Modern football analytics: xG, possession, form, and player & team insights.",
  openGraph: {
    title: "Football Analysts",
    description: "Modern football analytics: xG, possession, form, and player & team insights.",
    url: "/",
    siteName: "Football Analysts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Football Analysts",
    description: "Modern football analytics: xG, possession, form, and player & team insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
