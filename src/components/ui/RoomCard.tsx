// src/components/ui/RoomCard.tsx

"use client"; 

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

// Type definition now includes 'offerId' for the booking action.
type RoomCardProps = {
  name: string;
  price: number;
  image: string;
  description: string;
  roomId: string | number;
  offerId: string; // The unique ID for the specific price offer.
};

/**
 * A client-side component to display a single, animated room card.
 * It now has two separate clickable actions.
 */
export default function RoomCard({ name, price, image, description, roomId, offerId }: RoomCardProps) {
  const imageUrl = image || "/placeholder-image.jpg"; 

  return (
    // This div is no longer a link itself. It's just a container.
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* ACTION 1: Clicking the image goes to the room details page. */}
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
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-current" />
            <span>€{price} / night</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-grow">{description}</p>
        
        <div className="mt-4">
          {/* ACTION 2: Clicking this button goes to the checkout page with the offer's ID. */}
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
      </div>
    </motion.div>
  );
}