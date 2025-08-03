// src/app/page.tsx

import { getHotelParams, getHotelDefinitions } from '@/lib/api';
import HeroSlider from '@/components/sections/HeroSlider';
import AboutSection from '@/components/sections/AboutSection';
import RoomsSection from '@/components/sections/RoomSection';
import ServiceSection from '@/components/sections/ServiceSection';
import ContactSection from '@/components/sections/ContactSection';
import { motion } from 'framer-motion';

// Types remain the same
type Slide = { src: string };
type AboutData = { name?: string; description?: string; imageUrl?: string };
type Room = { 'room-id': number; 'room-name': string; 'room-image-url': string; 'room-property': string };

export default async function Home() {
  let heroSlides: Slide[] = [];
  let aboutSectionData: AboutData | null = null;
  let favoriteRooms: Room[] = [];

  try {
    const [hotelParams, hotelDefinitions] = await Promise.all([
      getHotelParams(),
      getHotelDefinitions()
    ]);
    
    if (hotelParams && Array.isArray(hotelParams.images)) {
      const staticUrls = [
        'https://erspublic.blob.core.windows.net/test/17cef905-e945-9292-80ad-578bd7342000.jpg',
        'https://erspublic.blob.core.windows.net/test/17cef905-e892-6133-8b80-1514865cf000.jpg',
        'https://erspublic.blob.core.windows.net/test/17cefff5-f96b-961-8710-bd4dd9f82000.jpg'
      ];
      const idsToFind = [321758, 292765];
      const foundImageObjects = hotelParams.images.filter((img: any) => idsToFind.includes(img['image-id']) && img['image-url']);
      const foundUrlsFromIds = foundImageObjects.map((img: any) => img['image-url']);
      heroSlides = [...staticUrls, ...foundUrlsFromIds].map(url => ({ src: url }));
    }

    if (hotelParams) {
        aboutSectionData = {
            name: hotelParams.general?.name,
            description: hotelParams.hotel_info?.description,
            imageUrl: hotelParams.hotel_info?.default_image,
        };
    }
    
    if (hotelDefinitions && Array.isArray(hotelDefinitions.roomtype)) {
      favoriteRooms = hotelDefinitions.roomtype.slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch initial page data:", error);
    heroSlides = [
      'https://erspublic.blob.core.windows.net/test/17cef905-e945-9292-80ad-578bd7342000.jpg',
      'https://erspublic.blob.core.windows.net/test/17cef905-e892-6133-8b80-1514865cf000.jpg',
      'https://erspublic.blob.core.windows.net/test/17cefff5-f96b-961-8710-bd4dd9f82000.jpg'
    ].map(url => ({ src: url }));
  }

  return (
    // This is a Server Component, but it can pass data to Client Components like HeroSlider,
    // and also contain other Server Components like the sections below.
    // The <main> tag from the original code is correct.
    <main>
      <HeroSlider slides={heroSlides} />
      
      {/* 
        The animation logic from the deleted PageSection.tsx is now here.
        Each section is a server component rendered within the main page flow.
        The motion effects will be applied by client components inside them.
      */}
      {aboutSectionData && <AboutSection data={aboutSectionData} />}
      <RoomsSection rooms={favoriteRooms} />
      <ServiceSection />
      <ContactSection />
    </main>
  );
}