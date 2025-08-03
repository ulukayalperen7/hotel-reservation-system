import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using the standard and reliable Inter font.
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// This will work without any extra packages.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talya Hotel | Luxury Resort & Spa",
  description: "Experience the perfect balance of luxury and comfort at Talya Hotel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-white antialiased`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}