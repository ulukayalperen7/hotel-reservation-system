import { getHotelParams } from '@/lib/api';
import HeroSlider from '@/components/sections/HeroSlider';
import PageSection from '@/components/layout/PageSection';

/**
 * The Home page is a Server Component. It fetches data on the server before
 * sending the final HTML to the client, ensuring fast load times.
 */
export default async function Home() {
  
  let finalSlides = [];

  // --- HYBRID LIST APPROACH ---
  // A bulletproof method combining your specified URLs and IDs.

  //  These are guaranteed to be in the list.
  const staticUrls = [
    'https://erspublic.blob.core.windows.net/test/17cef905-e945-9292-80ad-578bd7342000.jpg',
    'https://erspublic.blob.core.windows.net/test/17cef905-e892-6133-8b80-1514865cf000.jpg',
    'https://erspublic.blob.core.windows.net/test/17cefff5-f96b-961-8710-bd4dd9f82000.jpg'
  ];

  //  We will find their URLs from the API response.
  const idsToFind = [321758, 292765];

  try {
    const hotelParams = await getHotelParams();
    
    let foundUrlsFromIds: string[] = [];

    if (hotelParams && Array.isArray(hotelParams.images)) {
      // Find the full image objects for the IDs you want.
      const foundImageObjects = hotelParams.images.filter((img: any) => 
          idsToFind.includes(img['image-id']) && img['image-url']
      );
      // Get just the URLs from those found objects.
      foundUrlsFromIds = foundImageObjects.map((img: any) => img['image-url']);
    }

    // Combine the static URLs and the URLs found via ID.
    const allUrls = [...staticUrls, ...foundUrlsFromIds];
    
    // Map the final combined list of URLs to the structure the slider needs.
    finalSlides = allUrls.map(url => ({ src: url }));

  } catch (error) {
    console.error("Failed to fetch hotel params for hero slider:", error);
    // If the API fails, at least try to show the static URLs.
    finalSlides = staticUrls.map(url => ({ src: url }));
  }

  return (
    <>
      <HeroSlider slides={finalSlides} />
      <PageSection />
    </>
  );
}