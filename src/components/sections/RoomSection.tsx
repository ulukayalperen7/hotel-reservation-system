
import RoomCard from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/button";
import { hotelConfig } from "../../../hotel.config";

export default function RoomsSection() {
    return (
        // The 'id' allows header links to scroll down to this section.
        <section id="rooms" className="bg-slate-50 py-16 sm:py-24">
            <div className="container mx-auto px-6 text-center">
                
                {/* Section Header */}
                <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                    ACCOMMODATION
                </h3>
                <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
                    Our Favorite Rooms
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                    Each of our rooms is designed with your comfort in mind, blending modern amenities with elegant style. Find your perfect sanctuary with us.
                </p>

                {/* Rooms Grid - This grid will display room cards. */}
                {/* It's responsive: 1 column on small screens, 2 on medium, and 3 on large screens. */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 
                      This is the dynamic part. We map over the 'rooms' array from our config file.
                      For each room object in the array, a <RoomCard> component is rendered.
                    */}
                    {hotelConfig.rooms.map((room) => (
                        <RoomCard
                            key={room.id} // The key is crucial for React's rendering performance.
                            name={room.name}
                            price={room.price}
                            image={room.image}
                            description={room.description}
                        />
                    ))}
                </div>
                
                <div className="mt-12">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4">
                        View All Rooms
                    </Button>
                </div>
            </div>
        </section>
    );
}