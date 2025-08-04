"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, XCircle, Wifi, Wind, Users, Square } from "lucide-react";

/**
 * Defines the properties that the RoomCard component accepts.
 * Now includes optional properties for general room features.
 */
type RoomCardProps = {
  name: string;
  image: string;
  roomId: string | number;
  checkoutUrl?: string;
  price?: number;
  boardType?: string;
  isRefundable?: boolean;
  area?: number;
  capacity?: number;
  hasBalcony?: boolean;
  hasWifi?: boolean;
};

export default function RoomCard({ 
  name, image, roomId, checkoutUrl, price, boardType, 
  isRefundable, area, capacity, hasBalcony, hasWifi 
}: RoomCardProps) {

  const imageUrl = image || "/placeholder-image.jpg"; 

  /**
   * This component's content changes based on whether it is displaying
   * a specific price offer (with `boardType`) or general room info.
   */
  const CardContent = () => (
    <>
      <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
      <div className="flex-grow min-h-[40px] text-sm text-slate-500">
        {boardType ? (
          // Renders the board type (e.g., "Oda Kahvaltı") if it's a price offer.
          <p className="text-amber-700 font-semibold">{boardType}</p>
        ) : (
          // Renders general room features if it's not a price offer.
          <div className="flex items-center gap-4 text-xs">
            {capacity && <span className="flex items-center"><Users className="h-4 w-4 mr-1" />{capacity} Guests</span>}
            {area && <span className="flex items-center"><Square className="h-4 w-4 mr-1" />{area} m²</span>}
            {hasWifi && <span className="flex items-center"><Wifi className="h-4 w-4 mr-1" />Wi-Fi</span>}
          </div>
        )}
      </div>
    </>
  );

  /**
   * This component renders the footer of the card, which contains the
   * "Select Offer" button and cancellation policy.
   */
  const CardFooter = () => (
    <div className="mt-auto pt-4 border-t border-slate-100/80">
      {typeof isRefundable === 'boolean' && (
        <div className={`flex items-center text-xs mb-3 ${isRefundable ? 'text-green-600' : 'text-red-600'}`}>
          {isRefundable ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
          <span className="font-medium">{isRefundable ? 'Free Cancellation' : 'Non-refundable'}</span>
        </div>
      )}
      {checkoutUrl && (
          <Link href={checkoutUrl}>
            <Button variant="outline" className="w-full ...">Select Offer</Button>
          </Link>
      )}
    </div>
  );

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
        {price && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 ...">
                <Star size={12} className="fill-current" />
                <span>€{price} / night</span>
            </div>
        )}
      </Link>

      <div className="p-5 text-left flex-grow flex flex-col">
        <CardContent />
        {/* The footer is only rendered if it is an offer card (has a checkoutUrl). */}
        {checkoutUrl && <CardFooter />}
      </div>
    </motion.div>
  );
}