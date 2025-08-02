"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookingForm from './BookingForm';

/**
 * Defines the structure for a single slide object that the component expects.
 */
interface HeroSlide {
  src: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

/**
 * Renders an interactive, auto-playing hero slider. This component is self-contained;
 * it manages its own state for animations and current slide based on the `slides`
 * prop provided by its parent.
 */
export default function HeroSlider({ slides }: HeroSliderProps) {
  // Holds the index of the currently displayed slide.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigates to the previous slide in the array, looping back to the end if necessary.
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Navigates to the next slide in the array, looping back to the beginning if necessary.
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // This effect sets up an interval to automatically advance the slider.
  // The returned function is a cleanup mechanism that clears the interval
  // when the component is unmounted or when dependencies change, preventing memory leaks.
  useEffect(() => {
    // The timer is only activated if there is more than one slide.
    if (slides.length <= 1) return;

    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, slides.length]);
  
  // Ensures the component renders nothing if no slides are provided, preventing potential errors.
  if (!slides || slides.length === 0) {
    return null; 
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Renders all slides into the DOM but controls their visibility via opacity. */}
      {/* This allows for smooth cross-fade transitions. */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
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
      
      {/* A semi-transparent gradient overlay to ensure text below is readable. */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />
      
      {/* The navigation buttons (left/right arrows) are only rendered if there is more than one slide. */}
      {slides.length > 1 && (
        <div className="absolute top-1/2 left-4 right-4 z-20 flex -translate-y-1/2 justify-between">
          <motion.button 
            onClick={goToPrevious} 
            className="p-3 text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/40 transition-all"
            whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeft size={32} />
          </motion.button>
          <motion.button 
            onClick={goToNext} 
            className="p-3 text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/40 transition-all"
            whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronRight size={32} />
          </motion.button>
        </div>
      )}
              
      <div className="relative z-10 h-full flex flex-col justify-end items-center p-4 sm:p-8 md:p-12">
        <motion.div 
          className="w-full mt-2 flex justify-center"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
        >
           <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}