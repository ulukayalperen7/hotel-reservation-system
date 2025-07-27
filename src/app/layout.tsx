import type { Metadata } from "next";
import { Geist } from "next/font/google"; // Using Geist Sans font
import "./globals.css";

import Footer from "@/components/layout/Footer"; // Importing our new Footer

// We only need Geist Sans for this design, Mono is not required.
const geistSans = Geist({
  variable: "--font-geist-sans", // Makes the font available as a CSS variable
  subsets: ["latin"],
});

// We can update the metadata to be more specific to our hotel.
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
    // Added '!scroll-smooth' for the anchor links in the header
    <html lang="en" className="!scroll-smooth">
      {/* 
        The class names are now combined:
        - geistSans.variable: Your modern font setup.
        - flex flex-col min-h-screen: My structure to make the footer sticky.
        - antialiased: Your setting for smoother font rendering.
      */}
      <body
        className={`${geistSans.variable} flex flex-col min-h-screen antialiased`}
      >
        {/* 'flex-grow' allows this main content to push the footer down. */}
        <main className="flex-grow">{children}</main>
        
        {/* The Footer is now part of the main layout, appearing on every page. */}
        <Footer />
      </body>
    </html>
  );
}