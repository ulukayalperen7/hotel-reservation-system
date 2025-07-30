import Header from "@/components/layout/Header";
import Image from "next/image";

/**
 * Fetches hotel data, including room types and images, from the API.
 * Next.js runs this function on the server.
 */
async function getHotelData() {
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    const url = `${baseUrl}/hotel/${hotelId}/hotel-definitions?language=TR`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        // This is for performance.
        // It tells Next.js to cache data for 1 hour.
        // The page will be very fast after the first visit.
        next: { revalidate: 3600 } 
    });

    // If the API response status is not "200 OK", we should stop.
    if (!response.ok) {
        throw new Error('API request failed');
    }

    // Return the JSON data from the response.
    return response.json();
}

/**
 * The GalleryPage component.
 * It is now an 'async' component. This lets us use 'await' inside it.
 */
export default async function GalleryPage() {
    // Call our function and wait for the API data.
    const data = await getHotelData();

    // The API response has an array named 'roomtype'. We get it here.
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
                          Map over the 'rooms' array we got from the API.
                          The 'filter' is important to avoid errors if a room has no image.
                        */}
                        {rooms && rooms
                          .filter((room: any) => room['room-image-url'])
                          .map((room: any) => (
                            <div key={room['room-id']} className="relative aspect-square rounded-lg overflow-hidden group">
                                <Image
                                    // Use the image URL from the API.
                                    src={room['room-image-url']}
                                    // Use the room name from the API for the alt text.
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