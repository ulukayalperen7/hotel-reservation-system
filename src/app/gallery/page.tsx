import Header from "@/components/layout/Header";
import Image from "next/image";
import { getHotelDefinitions } from "@/lib/api"; 

/**
 * The GalleryPage component.
 * It is an 'async' component, so we can use 'await' for data fetching.
 */
export default async function GalleryPage() {
    // Call the function from lib/api.ts to get the hotel data.
    const data = await getHotelDefinitions();
    const rooms = data.roomtype;

    return (
        <>
            <Header />
            <div className="pt-24 bg-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Gallery</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                            Explore the stunning visuals of our resort, from elegant rooms to breathtaking views.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* 
                          This part maps over the 'rooms' array fetched from the API.
                          The '.filter()' ensures that we only try to display rooms that have an image URL.
                        */}
                        {rooms && rooms
                          .filter((room: any) => room['room-image-url'])
                          .map((room: any) => (
                            <div key={room['room-id']} className="relative aspect-square rounded-lg overflow-hidden group">
                                <Image
                                    src={room['room-image-url']}
                                    alt={room['room-name']}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}