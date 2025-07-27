"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import BookingForm from '@/components/sections/BookingForm';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { hotelConfig } from '../../hotel.config';
import RoomsSection from '@/components/sections/RoomSection';
import ServicesSection from '@/components/sections/ServiceSection';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? hotelConfig.heroSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === hotelConfig.heroSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <Header />
      <section className="relative h-screen w-full overflow-hidden">
        {/* Enhanced hero slider with parallax effect */}
        <div className="absolute inset-0 w-full h-full">
          {hotelConfig.heroSlides.map((slide, index) => (
            <motion.div 
              key={slide.src} 
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${ index === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
              style={{ backgroundImage: `url(${slide.src})` }}
              animate={{ 
                scale: index === currentIndex ? 1.05 : 1,
                filter: index === currentIndex ? "brightness(1)" : "brightness(0.8)"
              }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
          ))}
        </div>
        
        {/* Enhanced gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          animate={{ 
            background: [
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)",
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)",
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Enhanced navigation buttons */}
        <div className="absolute top-1/2 left-4 right-4 z-20 flex -translate-y-1/2 justify-between">
          <motion.button 
            onClick={goToPrevious} 
            className="p-3 text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/40 transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeft size={32} />
          </motion.button>
          <motion.button 
            onClick={goToNext} 
            className="p-3 text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/40 transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronRight size={32} />
          </motion.button>
        </div>
                
        <div className="relative z-10 h-full flex flex-col justify-end items-center p-4 sm:p-8 md:p-12">
          <motion.div 
            className="text-center w-full max-w-4xl"
            key={currentIndex}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                animate={{ 
                  textShadow: [
                    '2px 2px 8px rgba(0,0,0,0.7)',
                    '4px 4px 12px rgba(0,0,0,0.8)',
                    '2px 2px 8px rgba(0,0,0,0.7)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {hotelConfig.heroSlides[currentIndex].title}
              </motion.h1>
          </motion.div>
          <motion.div 
            className="w-full mt-2 flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
          >
             <BookingForm />
          </motion.div>
        </div>
      </section>

      {/* Enhanced section animations with different effects */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 80 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <RoomsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100, rotateY: -15 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <ContactSection />
      </motion.div>
    </>
  );
}