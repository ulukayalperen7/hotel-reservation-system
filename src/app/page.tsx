"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import BookingForm from '@/components/sections/BookingForm';
import AboutSection from '@/components/sections/AboutSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { hotelConfig } from '../../hotel.config';
import RoomsSection from '@/components/sections/RoomSection';

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
      <section className="relative h-screen w-full">
        {/* Hero Slider Section */}
        <div className="absolute inset-0 w-full h-full">
          {hotelConfig.heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute top-1/2 left-4 right-4 z-20 flex -translate-y-1/2 justify-between">
          <button onClick={goToPrevious} className="p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-all"><ChevronLeft size={32} /></button>
          <button onClick={goToNext} className="p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-all"><ChevronRight size={32} /></button>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end items-center p-4 sm:p-8 md:p-12">
          <div className="text-center w-full max-w-4xl">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
              >
                {hotelConfig.heroSlides[currentIndex].title}
              </h1>
          </div>
          <div className="w-full mt-2">
             <BookingForm />
          </div>
        </div>
      </section>

      <AboutSection />
      
      {/* The old placeholder is now replaced with our new dynamic RoomsSection. */}
      <RoomsSection />

      {/* Placeholders for the remaining sections */}
      <section id="services" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold">Our Services Section</h2>
      </section>
      <section id="contact" className="py-20 bg-slate-50 text-center">
        <h2 className="text-4xl font-bold">Contact Us Section</h2>
      </section>
    </>
  );
}