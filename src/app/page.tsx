"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import BookingForm from '@/components/sections/BookingForm';
import AboutSection from '@/components/sections/AboutSection'; // <-- The new section component is imported.
import { ChevronLeft, ChevronRight } from 'lucide-react';

// This array holds the data for our hero slider.
// IMPORTANT: Make sure the image paths match the files in your /public folder.
const slides = [
  { src: '/hero-1.jpg', title: 'Unforgettable Stays, Unbeatable Prices' },
  { src: '/hero-2.jpg', title: 'Your Private Paradise Awaits' },
  { src: '/hero-3.jpg', title: 'Experience Culinary Excellence' },
];

export default function Home() {
  // State to keep track of the currently active slide index.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Functions to handle manual navigation.
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // This effect sets up an interval to automatically switch slides.
  useEffect(() => {
    const timer = setInterval(goToNext, 5000); // Changes slide every 5 seconds
    // This cleanup function clears the interval when the component is unmounted.
    return () => clearInterval(timer);
  }, [currentIndex]);


  return (
    <>
      <Header />
      <section className="relative h-screen w-full">
        {/* Background Image Container. It holds all slide images. */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>

        {/* This overlay adds a dark gradient from the bottom to make text more readable. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Slider Navigation Arrows */}
        <div className="absolute top-1/2 left-4 right-4 z-20 flex -translate-y-1/2 justify-between">
          <button onClick={goToPrevious} className="p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-all">
            <ChevronLeft size={32} />
          </button>
          <button onClick={goToNext} className="p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-all">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Main Content Area (Title and Form) */}
        <div className="relative z-10 h-full flex flex-col justify-end items-center p-4 sm:p-8 md:p-12">
          <div className="text-center w-full max-w-4xl">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
              >
                {slides[currentIndex].title}
              </h1>
          </div>
          <div className="w-full mt-2">
             <BookingForm />
          </div>
        </div>
      </section>

      {/* The old placeholder is now replaced with our new component. */}
      <AboutSection />

      {/* Placeholder for the next section, 'Our Rooms'. */}
      <section id="rooms" className="py-20 bg-slate-50 text-center">
        <h2 className="text-4xl font-bold">Our Rooms Section</h2>
      </section>
    </>
  );
}