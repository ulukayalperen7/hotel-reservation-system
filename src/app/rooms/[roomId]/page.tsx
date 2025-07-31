import { getHotelDefinitions } from '@/lib/api';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// The page component receives `params` which contain the dynamic parts of the URL.
interface RoomDetailPageProps {
  params: { roomId: string };
}

/**
 * Renders the detailed page for a single room type.
 * It fetches all room definitions and finds the one matching the roomId.
 */
export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { roomId } = await params;
  const data = await getHotelDefinitions();
  
  // Find the specific room. We use `==` for type-coercion as param is string, id might be number.
  const room = data.roomtype.find((r: any) => r['room-id'] == roomId);

  // If a room with the given ID doesn't exist, show the default 404 page.
  if (!room) {
    notFound();
  }

  // A simple helper to parse the comma-separated features from the 'room-property' string.
  const roomFeatures = room['room-property']?.split(',').map((feature: string) => feature.trim()) || [];

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="container mx-auto px-6 pt-32 pb-16">
          {/* Top section with the main room image and title */}
          <div className="relative w-full h-[60vh] max-h-[500px] rounded-lg overflow-hidden shadow-2xl mb-12">
            <Image
              src={room['room-image-url'] || '/placeholder.jpg'} // Uses a fallback if no image exists
              alt={`Main image of ${room['room-name']}`}
              fill
              className="object-cover"
              priority // Prioritizes loading of this critical image
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                {room['room-name']}
              </h1>
            </div>
          </div>
          
          {/* Main content grid with details and call-to-action */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Details and Features */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">
                Room Details
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A spacious and elegantly designed room offering comfort and luxury. Perfect for both leisure and business travelers seeking a memorable stay. Find detailed features below.
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mt-10 mb-6">
                What this room offers
              </h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-slate-700">
                {roomFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-amber-500 mr-2.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Booking Call-to-Action */}
            <div className="md:col-span-1">
              <div className="bg-slate-50 rounded-lg p-6 shadow-md border border-slate-200 sticky top-32">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Book?</h3>
                <p className="text-slate-500 mb-6">
                  Select your travel dates on our search page to get the best available price for the {room['room-name']}.
                </p>
                <Link href="/booking/search">
                  <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3">
                    Check Prices
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}