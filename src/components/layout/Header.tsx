import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    // This header is positioned absolutely to float over the hero image.
    // The z-50 utility ensures it stays on top of other elements.
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      {/* A container to center the content and apply horizontal padding. */}
      <nav className="container mx-auto flex items-center justify-between p-6 text-white">
        
        {/* The main logo or brand name, linking back to the homepage. */}
        <Link 
          href="/" 
          className="text-3xl font-bold tracking-wider hover:scale-105 transition-transform" 
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
        >
          Talya Hotel
        </Link>
        
        {/* Main navigation links, hidden on smaller screens (mobile). */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#about" className="text-lg hover:text-amber-300 transition-colors">About</Link>
          <Link href="/#rooms" className="text-lg hover:text-amber-300 transition-colors">Rooms</Link>
          <Link href="/#gallery" className="text-lg hover:text-amber-300 transition-colors">Gallery</Link>
        </div>
        
        {/* The primary call-to-action button. */}
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg">
          Book Now
        </Button>

      </nav>
    </header>
  );
}