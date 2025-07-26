'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Icons for the top bar
import { Globe, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


export default function Header() {
  // State to track if the user has scrolled down the page.
  const [isScrolled, setIsScrolled] = useState(false);

  // This effect adds a scroll event listener when the component mounts.
  useEffect(() => {
    const handleScroll = () => {
      // Sets the state to true if user scrolls more than 10px, otherwise false.
      setIsScrolled(window.scrollY > 10);
    };

    // Add the event listener.
    window.addEventListener('scroll', handleScroll);

    // This is a cleanup function. It removes the event listener when the component unmounts
    // to prevent memory leaks and performance issues.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty array ensures this effect runs only once.

  return (
    // The 'fixed' position keeps the header at the top of the viewport.
    // 'transition-all' and 'duration-300' create a smooth animation for background and color changes.
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      {
        'bg-white shadow-md': isScrolled, // When scrolled, background becomes white with a shadow.
        'bg-transparent': !isScrolled, // At the top, background is transparent.
      }
    )}>

      {/* ===== TOP BAR - Only visible when scrolled ===== */}
      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isScrolled ? "max-h-12 opacity-100" : "max-h-0 opacity-0" // Animates height and opacity for a smooth appearance.
      )}>
        <div className="container mx-auto flex justify-between items-center h-10 px-6 border-b border-slate-200">
            {/* Contact Info */}
            <div className="flex items-center space-x-4 text-slate-600 text-xs">
                <a href="tel:+18881234567" className="flex items-center hover:text-amber-600"><Phone size={14} className="mr-1.5"/> 1-888-123-4567</a>
                <a href="mailto:contact@talya.com" className="flex items-center hover:text-amber-600"><Mail size={14} className="mr-1.5"/> contact@talya.com</a>
            </div>
            {/* Social & Language */}
            <div className="flex items-center space-x-4">
                <a href="#" className="text-slate-500 hover:text-slate-900"><FaInstagram /></a>
                <a href="#" className="text-slate-500 hover:text-slate-900"><FaXTwitter /></a>
                <a href="#" className="text-slate-500 hover:text-slate-900"><FaLinkedin /></a>
                <div className="w-px h-4 bg-slate-200"></div> {/* Separator */}
                <button className="flex items-center text-slate-600 hover:text-amber-600 text-xs">
                    <Globe size={14} className="mr-1.5"/>
                    <span>English</span>
                </button>
            </div>
        </div>
      </div>
      
      {/* ===== MAIN NAVIGATION ===== */}
      <nav className="container mx-auto flex items-center justify-between p-4 transition-colors duration-300">
        <Link 
          href="/" 
          className={cn(
            "text-3xl font-bold tracking-wider hover:scale-105 transition-transform",
            isScrolled ? "text-slate-900" : "text-white"
          )}
          style={{ textShadow: isScrolled ? 'none' : '2px 2px 6px rgba(0,0,0,0.8)' }} // Shadow is removed on scroll.
        >
          Talya Hotel
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
            {['About', 'Rooms', 'Gallery', 'Contact'].map((item) => (
                <Link
                    key={item}
                    href={`/#${item.toLowerCase()}`}
                    className={cn(
                        "text-lg relative group transition-colors",
                        isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white hover:text-amber-300"
                    )}
                    style={{ textShadow: isScrolled ? 'none' : '1px 1px 4px rgba(0,0,0,0.7)' }}
                >
                    {item}
                    <span className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full",
                        isScrolled ? "bg-amber-500" : "bg-amber-300"
                    )}></span>
                </Link>
            ))}
        </div>
        
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
          Book Now
        </Button>
      </nav>
    </header>
  );
}