"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, XCircle } from "lucide-react";

/**
 * Defines the properties that the RoomCard component accepts.
 */
type RoomCardProps = {
  name: string;
  image: string;
  roomId: string | number;
  price?: number;
  offerId?: string;
  boardType?: string;
  isRefundable?: boolean;
};

/**
 * A client-side component to display a single, animated room card.
 */
export default function RoomCard({ name, image, roomId, price, offerId, boardType, isRefundable }: RoomCardProps) {
  const imageUrl = image || "/placeholder-image.jpg"; 

  /**
   * Provides a curated static description for different room types,
   * used when no specific offer details (like boardType) are available.
   */
  const staticDescriptions: { [key: string]: string } = {
    'Suit': "Geniş yaşam alanı ve lüks detaylarla donatılmış, unutulmaz bir konaklama deneyimi.",
    'Ekonomik': "Konforlu ve pratik bir konaklama için ihtiyacınız olan her şey.",
    'B Suites': "Modern tasarım ve üstün konforu bir arada sunan şık bir kaçış noktası.",
    'Standart': "Konforunuz için tasarlanmış şık ve modern bir oda.",
  };

  /**
   * Renders the main content of the card's body, which changes based on
   * whether it's displaying a general room or a specific price offer.
   */
  const CardContent = () => (
    <>
      <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{name}</h3>
      <div className="flex-grow min-h-[40px]">
        {boardType ? (
          <p className="text-amber-700 text-sm font-semibold">{boardType}</p>
        ) : (
          <p className="text-slate-500 text-sm leading-relaxed">
            {staticDescriptions[name] || "Konforunuz için tasarlanmış şık ve modern bir oda."}
          </p>
        )}
      </div>
    </>
  );

  /**
   * Renders the footer of the card, which shows offer-specific details
   * like cancellation policy and the "Select Offer" button.
   */
  const CardFooter = () => (
    <div className="mt-auto pt-4 border-t border-slate-100/80">
      {typeof isRefundable === 'boolean' && (
        <div className={`flex items-center text-xs mb-3 ${isRefundable ? 'text-green-600' : 'text-red-600'}`}>
          {isRefundable ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
          <span className="font-medium">{isRefundable ? 'Free Cancellation' : 'Non-refundable'}</span>
        </div>
      )}
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
        
        <CardContent />
        
        {offerId && <CardFooter />}
      </div>
    </motion.div>
  );
}