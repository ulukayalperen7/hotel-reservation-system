import { motion } from 'framer-motion';
import RoomCard from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/button";
import { hotelConfig } from "../../../hotel.config";

export default function RoomsSection() {
    return (
        <section id="rooms" className="bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50 py-16 sm:py-24 relative overflow-hidden">
            {/* Floating background elements for visual depth */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 20, 0],
                    scale: [1, 0.8, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <div className="container mx-auto px-6 text-center relative z-10">
                
                {/* Enhanced header with multiple animation layers */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.h3 
                        className="text-sm font-bold tracking-widest text-amber-500 uppercase relative"
                        initial={{ letterSpacing: "0.5em", opacity: 0 }}
                        whileInView={{ letterSpacing: "0.2em", opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
                            initial={{ backgroundPosition: "200% center" }}
                            whileInView={{ backgroundPosition: "0% center" }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            style={{ backgroundSize: "200% 100%" }}
                        >
                            ACCOMMODATION
                        </motion.span>
                        ACCOMMODATION
                    </motion.h3>
                    
                    <motion.h2 
                        className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-amber-900 bg-clip-text text-transparent"
                            initial={{ backgroundPosition: "200% center" }}
                            whileInView={{ backgroundPosition: "0% center" }}
                            transition={{ delay: 0.8, duration: 2 }}
                            style={{ backgroundSize: "200% 100%" }}
                        >
                            Our Favorite Rooms
                        </motion.span>
                        Our Favorite Rooms
                    </motion.h2>
                    
                    <motion.p 
                        className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Each of our rooms is designed with your comfort in mind, blending modern amenities with elegant style. Find your perfect sanctuary with us.
                    </motion.p>
                </motion.div>

                {/* Enhanced room cards with dramatic stagger effect */}
                <motion.div 
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {hotelConfig.rooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ 
                                opacity: 0, 
                                y: 100,
                                rotateX: 45,
                                scale: 0.8
                            }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0,
                                rotateX: 0,
                                scale: 1
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ 
                                delay: index * 0.2,
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <RoomCard
                                name={room.name}
                                price={room.price}
                                image={room.image}
                                description={room.description}
                            />
                        </motion.div>
                    ))}
                </motion.div>
                                
                {/* Enhanced button with glow effect */}
                <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative inline-block"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg blur-lg opacity-0"
                            whileHover={{ opacity: 0.4, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <Button 
                            size="lg" 
                            className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                View All Rooms
                            </motion.span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}