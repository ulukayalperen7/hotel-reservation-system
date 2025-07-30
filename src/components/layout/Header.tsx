
"use client"; // we can use language API on documentation 

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe, Phone, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { hotelConfig } from "../../../hotel.config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        { "bg-white shadow-md": isScrolled, "bg-transparent": !isScrolled }
      )}
    >
      {/* Top bar remains the same */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isScrolled ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto flex justify-between items-center h-10 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-4 text-slate-600 text-xs">
            <a
              href={`tel:${hotelConfig.contact.phone}`}
              className="flex items-center hover:text-amber-600"
            >
              <Phone size={14} className="mr-1.5" /> {hotelConfig.contact.phone}
            </a>
            <a
              href={`mailto:${hotelConfig.contact.email}`}
              className="flex items-center hover:text-amber-600"
            >
              <Mail size={14} className="mr-1.5" /> {hotelConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={hotelConfig.socialLinks.instagram}
              className="text-slate-500 hover:text-slate-900"
            >
              <FaInstagram />
            </a>
            <a
              href={hotelConfig.socialLinks.twitter}
              className="text-slate-500 hover:text-slate-900"
            >
              <FaXTwitter />
            </a>
            <a
              href={hotelConfig.socialLinks.linkedin}
              className="text-slate-500 hover:text-slate-900"
            >
              <FaLinkedin />
            </a>
            <div className="w-px h-4 bg-slate-200"></div>
            <button className="flex items-center text-slate-600 hover:text-amber-600 text-xs">
              <Globe size={14} className="mr-1.5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto flex items-center justify-between p-4 transition-colors duration-300">
        <Link
          href="/"
          className={cn(
            "text-3xl font-bold tracking-wider hover:scale-105 transition-transform",
            isScrolled ? "text-slate-900" : "text-white"
          )}
          style={{
            textShadow: isScrolled ? "none" : "2px 2px 6px rgba(0,0,0,0.8)",
          }}
        >
          {hotelConfig.name}
        </Link>

        {/* UPDATED: Links are now dynamically generated from hotelConfig.navLinks */}
        <div className="hidden md:flex items-center space-x-8">
          {hotelConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-lg relative group transition-colors",
                isScrolled
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-white hover:text-amber-300"
              )}
              style={{
                textShadow: isScrolled ? "none" : "1px 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full",
                  isScrolled ? "bg-amber-500" : "bg-amber-300"
                )}
              ></span>
            </Link>
          ))}
        </div>

       <Link href="/booking/search">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
              Book Now
            </Button>
        </Link>
      </nav>
    </header>
  );
}
