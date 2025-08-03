// src/app/gallery/page.tsx

import Image from "next/image";
import { getHotelParams } from "@/lib/api"; // We now use getHotelParams to fetch the main gallery.

/**
 * Defines the type structure for a single image object from the API's main gallery.
 * This ensures type safety and code clarity.
 */
type GalleryImage = {
  'image-id': number;
  'image-url': string;
  'image-caption': string;
};

/**
 * The GalleryPage component, rewritten to fetch from the correct API endpoint.
 * It now displays the hotel's general marketing images instead of just room photos.
 */
export default async function GalleryPage() {
    let galleryImages: GalleryImage[] = [];

    try {
        // We call getHotelParams to get the main 'images' array.
        const hotelParams = await getHotelParams();
        
        // We check if the 'images' array exists and is actually an array before using it.
        if (hotelParams && Array.isArray(hotelParams.images)) {
            galleryImages = hotelParams.images;
        }
    } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        // If the API call fails, the page will simply show no images
        // instead of crashing.
    }

    return (
        // The redundant <Header /> is removed, as it's handled by layout.tsx.
        <div className="pt-24 bg-white">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Gallery</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                        Explore the stunning visuals of our resort, from elegant rooms to breathtaking views.
                    </p>
                </div>

                {/* The main grid for displaying gallery images. */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* 
                      The component now maps over the 'galleryImages' array.
                      It shows a message if no images are found.
                    */}
                    {galleryImages.length > 0 ? (
                      galleryImages.map((image: GalleryImage) => (
                        <div key={image['image-id']} className="relative aspect-square rounded-lg overflow-hidden group shadow-md">
                            <Image
                                src={image['image-url']}
                                alt={image['image-caption'] || 'Hotel gallery image'}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            {/* An overlay with the image caption that appears on hover. */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 p-3">
                                    <p className="text-white text-sm font-semibold">{image['image-caption']}</p>
                                </div>
                            </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-16">
                        <p className="text-slate-500">No gallery images available at this time.</p>
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
}