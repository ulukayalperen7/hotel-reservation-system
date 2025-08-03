"use client";

import { motion } from 'framer-motion';
import RoomCard from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Defines the expected structure of a single room object.
type Room = {
    'room-id': number;
    'room-name': string;
    'room-image-url': string;
    'room-property': string;
};

// Defines the props for the RoomsSection component.
type RoomsSectionProps = {
    rooms: Room[];
};

/**
 * A client-side component that displays a section for "favorite rooms".
 * It receives room data via props and dynamically renders a list of RoomCard components.
 */
export default function RoomsSection({ rooms }: RoomsSectionProps) {
    // If there are no rooms, the component renders nothing.
    if (!rooms || rooms.length === 0) {
        return null;
    }
    
    return (
        <motion.section
            id="rooms"
            className="bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50 py-16 sm:py-24 relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Adjusted amount for earlier trigger
            transition={{ duration: 0.8 }}
        >
            {/* Background decorative elements are preserved. */}
            <motion.div /* ...omitted for brevity... */ />
            <motion.div /* ...omitted for brevity... */ />
            
            <div className="container mx-auto px-6 text-center relative z-10">
                
                <motion.div /* ...Header animation preserved... */ >
                    <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                        ACCOMMODATION
                    </h3>
                    <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
                        Our Favorite Rooms
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Each of our rooms is designed with your comfort in mind, blending modern amenities with elegant style. Find your perfect sanctuary with us.
                    </p>
                </motion.div>

                <motion.div 
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {/* The static map is replaced with a dynamic one using the 'rooms' prop. */}
                    {rooms.map((room, index) => (
                        <motion.div
                            key={room['room-id']}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ 
                                delay: index * 0.2,
                                duration: 0.7,
                                ease: "easeOut"
                            }}
                        >
                            <RoomCard
                                // Mapping API data fields to RoomCard props.
                                roomId={room['room-id']}
                                name={room['room-name']}
                                image={room['room-image-url']}
                                description={room['room-property']}
                                // 'price' and 'offerId' are intentionally not passed here.
                            />
                        </motion.div>
                    ))}
                </motion.div>
                                
                <motion.div /* ...Button animation preserved... */ >
                    <Link href="/rooms">
                        <Button
                            size="lg"
                            className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            View All Rooms
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}