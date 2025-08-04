"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, XCircle, Home, BedDouble } from "lucide-react";

/**
 * Defines the properties that the RoomCard component accepts.
 * The checkoutUrl prop is now included.
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
};

/**
 * A client-side component to display a single, animated room card.
 */
export default function RoomCard({ name, image, roomId, checkoutUrl, price, boardType, isRefundable, area, capacity }: RoomCardProps) {
  const imageUrl = image || "/placeholder-image.jpg"; 

  const CardContent = () => (
    <>
      <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
      <div className="flex-grow min-h-[40px] text-sm text-slate-500">
        {boardType ? (
          <p className="text-amber-700 font-semibold">{boardType}</p>
        ) : (
           <div className="flex items-center gap-4">
              {capacity && <span className="flex items-center"><BedDouble className="h-4 w-4 mr-1.5" /> Up to {capacity} guests</span>}
              {area && <span className="flex items-center"><Home className="h-4 w-4 mr-1.5" /> {area} m²</span>}
           </div>
        )}
      </div>
    </>
  );

  const CardFooter = () => (
    <div className="mt-auto pt-4 border-t border-slate-100/80">
      {typeof isRefundable === 'boolean' && (
        <div className={`flex items-center text-xs mb-3 ${isRefundable ? 'text-green-600' : 'text-red-600'}`}>
          {isRefundable ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
          <span className="font-medium">{isRefundable ? 'Free Cancellation' : 'Non-refundable'}</span>
        </div>
      )}
      {/* This link now uses the checkoutUrl prop directly. */}
      {checkoutUrl && (
          <Link href={checkoutUrl}>
            <Button
              variant="outline"
              className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold rounded-xl group"
            >
              Select Offer
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
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
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    <span>€{price} / night</span>
                </div>
            </div>
        )}
      </Link>

      <div className="p-5 text-left flex-grow flex flex-col">
        <CardContent />
        {checkoutUrl && <CardFooter />}
      </div>
    </motion.div>
  );
}