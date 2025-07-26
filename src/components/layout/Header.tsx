import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <nav className="container mx-auto flex items-center justify-between p-6 text-white">
        
        {/* Added text-shadow for better readability over images */}
        <Link 
          href="/" 
          className="text-3xl font-bold tracking-wider hover:scale-105 transition-transform" 
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
        >
          Talya Hotel
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {/* Each link now has a text-shadow and a subtle underline hover effect */}
          <Link href="/#about" className="text-lg hover:text-amber-300 transition-colors relative group" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/#rooms" className="text-lg hover:text-amber-300 transition-colors relative group" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Rooms
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/#gallery" className="text-lg hover:text-amber-300 transition-colors relative group" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all group-hover:w-full"></span>
          </Link>
        </div>
        
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
          Book Now
        </Button>

      </nav>
    </header>
  );
}