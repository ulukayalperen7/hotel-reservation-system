import { getHotelDefinitions } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wifi, Wind, Users, Square, Snowflake, Star, Tv } from 'lucide-react';
import React from 'react';

interface RoomDetailPageProps {
  params: { roomId: string };
}

/**
 * A reusable component for a single, beautifully styled room feature.
 */
const FeatureCard = ({ IconComponent, title, subtitle }: { IconComponent: React.ElementType, title: string, subtitle: string }) => (
  <div className="bg-white/50 border border-slate-200/50 rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-amber-100 p-3 rounded-md mr-4">
      <IconComponent className="h-6 w-6 text-amber-600" />
    </div>
    <div>
      <h4 className="font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { roomId } = await params;
  const data = await getHotelDefinitions();
  
  const room = data.roomtype.find((r: any) => r['room-id'] == roomId);

  if (!room) {
    notFound();
  }

  // This constructs the URL for the "Check Availability" button.
  // It directs the user to the search page, pre-selecting the current room by its ID.
  const searchUrlWithRoomId = `/booking/search?roomId=${room['room-id']}`;

  const features = [
    { 
      Icon: Users, 
      title: `Up to ${room['room-rules']?.['max-pax-capacity'] || 'N/A'} Guests`, 
      subtitle: "Maximum occupancy", 
      isAvailable: !!room['room-rules']?.['max-pax-capacity'] 
    },
    { 
      Icon: Square, 
      title: `${room['room-area'] || 'N/A'} m²`, 
      subtitle: "Room size", 
      isAvailable: !!room['room-area'] 
    },
    { Icon: Tv, title: "Smart TV", subtitle: "Entertainment system", isAvailable: true },
    { Icon: Snowflake, title: "Climate Control", subtitle: "Individual temperature control", isAvailable: true },
    { Icon: Wind, title: "Private Balcony", subtitle: "Enjoy the view", isAvailable: room['room-has-balcony'] },
    { Icon: Wifi, title: "Free Wi-Fi", subtitle: "High-speed internet", isAvailable: room['room-has-wifi'] },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border sticky top-32">
              <Image
                src={room['room-image-url'] || '/placeholder.jpg'}
                alt={`Main image of ${room['room-name']}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-sm font-semibold text-slate-700">
                <Users className="h-4 w-4 mr-2" />
                <span>{room['room-rules']?.['max-pax-capacity']} guests</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{room['room-name']}</h1>
            <div className="flex items-center border-l-4 border-amber-400 pl-4">
                <h2 className="text-2xl font-bold text-slate-800">Room Features</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature) => 
                feature.isAvailable && (
                  <FeatureCard 
                    key={feature.title}
                    IconComponent={feature.Icon}
                    title={feature.title}
                    subtitle={feature.subtitle}
                  />
                )
              )}
            </div>

            <div className="mt-12 bg-white rounded-lg p-8 shadow-lg border border-slate-200/60">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Ready to Book?</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />)}
                </div>
              </div>
              <p className="text-slate-500 mb-6">
                Select your travel dates to get the best rates for the <strong>{room['room-name']}</strong> with instant confirmation.
              </p>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-600"><Star className="h-4 w-4 mr-3 text-green-500" /> Best price guarantee</li>
                  <li className="flex items-center text-slate-600"><Star className="h-4 w-4 mr-3 text-green-500" /> Free cancellation options</li>
              </ul>
              <Link href={searchUrlWithRoomId}>
                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 text-lg">
                  Check Availability & Prices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}