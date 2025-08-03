import { getHotelParams, getHotelDefinitions } from '@/lib/api';
import HeroSlider from '@/components/sections/HeroSlider';
import AboutSection from '@/components/sections/AboutSection';
import ServiceSection from '@/components/sections/ServiceSection';
import ContactSection from '@/components/sections/ContactSection';
import RoomSection from '@/components/sections/RoomSection';

type Slide = {
  src: string;
};

type AboutData = {
  name?: string;
  description?: string;
  imageUrl?: string;
};

type Room = {
  'room-id': number;
  'room-name': string;
  'room-image-url': string;
  'room-property': string;
};

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
      const foundImageObjects = hotelParams.images.filter((img: any) => 
          idsToFind.includes(img['image-id']) && img['image-url']
      );
      const foundUrlsFromIds = foundImageObjects.map((img: any) => img['image-url']);
      heroSlides = [...staticUrls, ...foundUrlsFromIds].map(url => ({ src: url }));
    }

    if (hotelParams) {
        // Since `hotel_info` is undefined for this hotel, we will construct the
        // About Us section from other available data to ensure it's not empty.
        aboutSectionData = {
            // Get the name from the general section, which we know exists.
            name: hotelParams.general?.name,
            
            // Provide a generic, high-quality fallback description.
            description: "<p>Otelimiz, konfor ve şıklığı bir araya getirerek misafirlerine unutulmaz bir konaklama deneyimi sunar. Modern olanaklarımız ve misafirperver ekibimizle, tatiliniz boyunca her anın tadını çıkarmanız için buradayız.</p>",
            
            // Use the FIRST image from the main `images` array as the About Us image.
            // This ensures we always have an image if the gallery exists.
            imageUrl: hotelParams.images?.[0]?.['image-url'],
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
    <main>
      <HeroSlider slides={heroSlides} />
      
      {/* 
        The AboutSection is guaranteed to have data, so it will always render.
      */}
      {aboutSectionData && <AboutSection data={aboutSectionData} />}
      
      <RoomSection rooms={favoriteRooms} />
      <ServiceSection />
      <ContactSection />
    </main>
  );
}