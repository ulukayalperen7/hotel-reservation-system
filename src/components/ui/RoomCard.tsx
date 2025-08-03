// src/components/ui/RoomCard.tsx

"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Square, Users, Wind, Wifi } from "lucide-react";

/**
 * The properties that the RoomCard component accepts.
 * Instead of a generic 'description', it now accepts specific, structured data
 * to build the features list, allowing for a more consistent and robust design.
 */
type RoomCardProps = {
  name: string;
  image: string;
  roomId: string | number;
  price?: number;
  offerId?: string;
  // Dynamic features data pulled from the API
  area?: number;
  capacity?: number;
  hasBalcony?: boolean;
  hasWifi?: boolean;
};

/**
 * A client-side component to display a single, animated room card.
 * It now uses a combination of curated static text and dynamic, icon-based features
 * to create a professional and informative summary of the room.
 */
export default function RoomCard({ name, image, roomId, price, offerId, area, capacity, hasBalcony, hasWifi }: RoomCardProps) {
  const imageUrl = image || "/placeholder-image.jpg"; 

  /**
   * Defines a mapping of specific room names to curated, static descriptions.
   * This provides a professional marketing text instead of relying on inconsistent API data.
   */
  const staticDescriptions: { [key: string]: string } = {
    'Suit': "Geniş yaşam alanı ve lüks detaylarla donatılmış, unutulmaz bir konaklama deneyimi.",
    'Ekonomik': "Konforlu ve pratik bir konaklama için ihtiyacınız olan her şey.",
    'B Suites': "Modern tasarım ve üstün konforu bir arada sunan şık bir kaçış noktası.",
  };

  // Selects the appropriate static description or provides a default fallback.
  const displayDescription = staticDescriptions[name] || "Konforunuz için tasarlanmış şık ve modern bir oda.";

  /**
   * Dynamically builds a list of available room features to display with icons.
   * Only features with valid data from the API are included.
   */
  const features = [
    {
      Icon: Square,
      label: `${area} m²`,
      isAvailable: !!area,
    },
    {
      Icon: Users,
      label: `${capacity} Kişilik`,
      isAvailable: !!capacity,
    },
    {
      Icon: Wind,
      label: 'Balkonlu',
      isAvailable: hasBalcony === true,
    },
    {
      Icon: Wifi,
      label: 'Wi-Fi',
      isAvailable: hasWifi === true,
    },
  ];

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link href={`/rooms/${roomId}`} className="relative w-full h-56 overflow-hidden block">
        <Image
          src={imageUrl}
          alt={`Photo of ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-5 text-left flex-grow flex flex-col">
        {price && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    <span>€{price} / night</span>
                </div>
            </div>
        )}
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
        
        <p className="text-slate-500 text-sm leading-relaxed flex-grow min-h-[40px]">
          {displayDescription}
        </p>

        {/* This container renders the list of dynamic features with their icons. */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 pt-4 border-t border-slate-100">
          {features.map((feature, index) => 
            feature.isAvailable && (
              <div key={index} className="flex items-center text-slate-600 text-sm">
                <feature.Icon className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0" />
                <span>{feature.label}</span>
              </div>
            )
          )}
        </div>
        
        {/* This button remains conditional, appearing only when an offer is available. */}
        {offerId && (
            <div className="mt-6">
              <Link href={`/booking/checkout?offerId=${offerId}`}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold rounded-xl group"
                >
                  Select Offer
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
        )}
      </div>
    </motion.div>
  );
}