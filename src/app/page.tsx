"use client";

import Header from '@/components/layout/Header';
import BookingForm from '@/components/sections/BookingForm'; // <-- Import BookingForm

export default function Home() {
  return (
    <>
      {/* The Header component is already placed here. */}
      <Header />

      <section className="relative h-screen w-full bg-slate-800">
        <div className="relative z-10 h-full flex flex-col justify-end items-center p-4 sm:p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-center"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
            >
              Unforgettable Stays, Unbeatable Prices
            </h1>

            {/* The BookingForm component is now placed here. */}
            <div className="w-full mt-2">
                <BookingForm />
            </div>

        </div>
      </section>

      {/* Other sections like 'About Us' or 'Rooms' will be added below. */}
      <section id="about" className="py-20 text-center">
        <h2 className="text-4xl font-bold">About Us Section</h2>
      </section>
    </>
  );
}