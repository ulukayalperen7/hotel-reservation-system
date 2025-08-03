// src/app/booking/search/page.tsx

import BookingForm from "@/components/sections/BookingForm";
import RoomCard from "@/components/ui/RoomCard";
import { getPriceOffers, getHotelDefinitions } from "@/lib/api";

interface SearchPageProps {
  searchParams: { 
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string; 
  } 
}

// Define stricter types for better code quality
type Offer = {
    id: string;
    'room-type-id': number;
    'room-type': string;
    'discounted-price'?: number;
    price: number;
    description?: string;
    'rate-type'?: string;
};

type RoomDetail = {
    'room-id': number;
    'room-name': string;
    'room-image-url': string;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // `await` is removed here.
  const { checkIn, checkOut, adults = "1", children = "0" } = searchParams;
  const userHasSearched = !!checkIn && !!checkOut;

  let priceOffers: Offer[] = [];
  let allRoomDetails: RoomDetail[] = [];

  if (userHasSearched) {
      try {
          const [offersData, definitionsData] = await Promise.all([
              getPriceOffers(checkIn, checkOut, adults, children),
              getHotelDefinitions()
          ]);
          
          if (offersData && Array.isArray(offersData)) {
              priceOffers = offersData;
          }
          if (definitionsData && Array.isArray(definitionsData.roomtype)) {
              allRoomDetails = definitionsData.roomtype;
          }
      } catch (error) {
          console.error("Error fetching data on search page:", error);
      }
  }

  const createSafeDescription = (desc: string) => {
    if (!desc || typeof desc !== "string") return "Details for this room are available upon request.";
    return desc.replace(/<[^>]*>?/gm, " ");
  };

  return (
    // The redundant <Header /> is removed.
    <div className="pt-32 bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {userHasSearched ? (
          <div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">Available Offers</h1>
              <p className="mt-2 text-slate-500">Showing results for check‑in on <strong>{checkIn}</strong> for <strong>{adults}</strong> adult(s).</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {priceOffers.length > 0 ? (
                priceOffers.map((offer) => {
                  const roomInfo = allRoomDetails.find(room => room['room-id'] === offer['room-type-id']);
                  return (
                    <RoomCard
                      key={offer.id}
                      offerId={offer.id}
                      roomId={offer["room-type-id"]} 
                      name={roomInfo ? roomInfo['room-name'] : offer['room-type']} 
                      image={roomInfo ? roomInfo['room-image-url'] : "/placeholder.jpg"}
                      price={Math.round(offer["discounted-price"] || offer.price)}
                      description={createSafeDescription(offer.description || offer["rate-type"] || "")}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-slate-500">Sorry, no offers were found for the selected dates.</p>
                  <p className="text-md text-slate-400 mt-2">Please try searching for different dates.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Book Your Stay</h1>
              <p className="mt-2 text-slate-500">Select your dates and preferences to find the perfect room.</p>
            </div>
            <BookingForm />
          </div>
        )}
      </div>
    </div>
  );
}