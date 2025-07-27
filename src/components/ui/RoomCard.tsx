import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

type RoomCardProps = {
    name: string;
    price: number;
    image: string;
    description: string;
};

export default function RoomCard({ name, price, image, description }: RoomCardProps) {
    return (
        <motion.div 
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg group cursor-pointer relative"
            whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 2,
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25), 0 0 40px rgb(245 158 11 / 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
            }}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Glow effect background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-amber-200/30 rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Floating particles effect */}
            <motion.div
                className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full opacity-0"
                whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1],
                    x: [0, 20, 40],
                    y: [0, -10, -20]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-8 left-12 w-1 h-1 bg-amber-300 rounded-full opacity-0"
                whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [1, 2, 1],
                    x: [0, -15, -30],
                    y: [0, 15, 30]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            
            <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                <motion.div
                    className="w-full h-full relative"
                    whileHover={{ scale: 1.15, rotate: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Image
                        src={image}
                        alt={`Photo of the ${name}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    
                    {/* Image overlay with gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
                
                {/* Animated price tag with premium styling */}
                <motion.div 
                    className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ 
                        scale: 1.1,
                        rotate: [-2, 2, -2, 0],
                        boxShadow: "0 8px 25px rgb(245 158 11 / 0.4)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ x: 2 }}
                    >
                        <Star size={12} className="fill-current" />
                        €{price} / night
                    </motion.div>
                </motion.div>

                {/* Premium badge */}
                <motion.div
                    className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-amber-600 text-xs font-semibold px-3 py-1 rounded-full opacity-0"
                    whileHover={{ opacity: 1, y: -5 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    Premium Choice
                </motion.div>
            </div>
                        
            <div className="p-6 text-left relative z-10">
                <motion.h3 
                    className="text-2xl font-bold text-slate-800 mb-2"
                    whileHover={{ 
                        color: "#d97706",
                        x: 4,
                        textShadow: "0 2px 4px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {name}
                </motion.h3>
                
                <motion.p 
                    className="text-slate-500 text-sm leading-relaxed h-16"
                    whileHover={{ color: "#64748b" }}
                    transition={{ duration: 0.2 }}
                >
                    {description}
                </motion.p>
                
                <motion.div
                    className="mt-4"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            variant="outline" 
                            className="w-full border-2 border-amber-500 text-amber-600 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white transition-all duration-300 font-semibold py-3 rounded-xl group relative overflow-hidden"
                        >
                            {/* Button shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                whileHover={{ translateX: "200%" }}
                                transition={{ duration: 0.6 }}
                            />
                            
                            <motion.span
                                className="flex items-center justify-center gap-2 relative z-10"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                            >
                                View Details
                                <motion.div
                                    whileHover={{ x: 4, rotate: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </motion.div>
                            </motion.span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}