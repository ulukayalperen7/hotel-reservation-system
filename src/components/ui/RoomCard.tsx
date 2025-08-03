"use client"; 

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

// Type definition for the component's props.
// 'price' and 'offerId' are now optional to allow for flexible usage.
type RoomCardProps = {
  name: string;
  description: string;
  image: string;
  roomId: string | number;
  price?: number; // Optional: The price per night.
  offerId?: string; // Optional: The unique ID for a specific price offer.
};

/**
 * A client-side component to display a single, animated room card.
 * It conditionally renders the price badge and the "Select Offer" button
 * based on whether 'price' and 'offerId' props are provided.
 */
export default function RoomCard({ name, price, image, description, roomId, offerId }: RoomCardProps) {
  const imageUrl = image || "/placeholder-image.jpg"; 

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Action 1: Clicking the image goes to the room details page. */}
      <Link href={`/rooms/${roomId}`} className="relative w-full h-56 overflow-hidden block">
        <Image
          src={imageUrl}
          alt={`Photo of ${name || "a room"}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-5 text-left flex-grow flex flex-col">
        {/* The price badge is only rendered if a 'price' is provided. */}
        {price && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    <span>€{price} / night</span>
                </div>
            </div>
        )}
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
        {/* Using a fallback in case description is not provided. */}
        <p className="text-slate-500 text-sm leading-relaxed flex-grow">{description || "No description available."}</p>
        
        {/* The "Select Offer" button is only rendered if an 'offerId' is provided. */}
        {offerId && (
            <div className="mt-4">
              {/* Action 2: Clicking this button goes to the checkout page with the offer's ID. */}
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