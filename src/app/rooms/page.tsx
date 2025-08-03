import { getHotelDefinitions } from "@/lib/api";
import RoomCard from "@/components/ui/RoomCard"; // We will reuse our perfected RoomCard component.

/**
 * Defines the type structure for a single room, ensuring data consistency.
 * This should match the structure used in other parts of the app like RoomSection.
 */
type Room = {
  "room-id": number;
  "room-name": string;
  "room-image-url": string;
  "room-area"?: number;
  "room-rules": {
    "max-pax-capacity"?: number;
  };
  "room-has-balcony"?: boolean;
  "room-has-wifi"?: boolean;
};

/**
 * The page for displaying a list of all available room types at the hotel.
 * It fetches data on the server and renders a grid of RoomCard components.
 */
export default async function RoomsPage() {
  let allRooms: Room[] = [];

  try {
    // Fetch the static definitions for all room types.
    const definitionsData = await getHotelDefinitions();

    if (definitionsData && Array.isArray(definitionsData.roomtype)) {
      allRooms = definitionsData.roomtype;
    }
  } catch (error) {
    console.error("Failed to fetch room definitions:", error);
  }

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Our Rooms
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Discover your perfect space. Each of our rooms offers a unique blend
            of comfort, style, and modern amenities.
          </p>
        </div>

        {/* The grid layout for displaying all the room cards. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allRooms.length > 0 ? (
            allRooms.map((room) => (
              <RoomCard
                key={room["room-id"]}
                roomId={room["room-id"]}
                name={room["room-name"]}
                image={room["room-image-url"]}
                // We pass the dynamic feature data to each card.
                // The card's internal logic will handle the display.
                area={room["room-area"]}
                capacity={room["room-rules"]?.["max-pax-capacity"]}
                hasBalcony={room["room-has-balcony"]}
                hasWifi={room["room-has-wifi"]}
                // Note: 'price' and 'offerId' are not passed here,
                // so the "Select Offer" button will not be displayed.
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-slate-500">
                Could not load room information at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
