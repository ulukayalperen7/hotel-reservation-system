import BookingForm from "@/components/sections/BookingForm";
import RoomCard from "@/components/ui/RoomCard";
import { getPriceOffers, getHotelDefinitions } from "@/lib/api";

/**
 * Defines the properties expected in the URL search parameters.
 */
interface SearchPageProps {
  searchParams: { 
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string; 
  } 
}

/**
 * Defines the structure for various data types from the API for clarity.
 */
type Offer = {
    id: string;
    'room-type-id': number;
    'room-type': string;
    'board-type-id': number;
    'rate-type-id': number;
    'is-refundable': boolean;
    price: number;
    'discounted-price'?: number;
};

type RoomDetail = {
    'room-id': number;
    'room-name': string;
    'room-image-url': string;
};

type BoardType = {
    id: number;
    name: string;
};

/**
 * The server component for the search page. It fetches and displays available
 * price offers, enriching them with detailed definitions for a better user experience.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { checkIn, checkOut, adults = "1", children = "0" } = await searchParams;
  const userHasSearched = !!checkIn && !!checkOut;

  let priceOffers: Offer[] = [];
  let allRoomDetails: RoomDetail[] = [];
  let allBoardTypes: BoardType[] = [];

  if (userHasSearched) {
      try {
          const [offersData, definitionsData] = await Promise.all([
              getPriceOffers(checkIn, checkOut, adults, children),
              getHotelDefinitions()
          ]);
          
          if (offersData && Array.isArray(offersData)) {
              priceOffers = offersData;
          }
          if (definitionsData) {
              if(Array.isArray(definitionsData.roomtype)) allRoomDetails = definitionsData.roomtype;
              if(Array.isArray(definitionsData.boardtypes)) allBoardTypes = definitionsData.boardtypes;
          }
      } catch (error) {
          console.error("Error fetching data on search page:", error);
      }
  }

  return (
    <div className="pt-32 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {userHasSearched ? (
          <div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                Available Offers
              </h1>
              <p className="mt-2 text-slate-500">
                Showing results for check‑in on <strong>{checkIn}</strong> for{" "}
                <strong>{adults}</strong> adult(s).
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {priceOffers.length > 0 ? (
                priceOffers.map((offer) => {
                  // Finds the corresponding room details for each offer.
                  const roomInfo = allRoomDetails.find(room => room['room-id'] === offer['room-type-id']);
                  // Finds the full board type name (e.g., "Yarım Pansiyon") using the ID.
                  const boardInfo = allBoardTypes.find(board => board.id === offer['board-type-id']);
                  
                  return (
                    <RoomCard
                      key={offer.id}
                      offerId={offer.id}
                      roomId={offer["room-type-id"]} 
                      name={roomInfo ? roomInfo['room-name'] : offer['room-type']} 
                      image={roomInfo ? roomInfo['room-image-url'] : "/placeholder.jpg"}
                      price={Math.round(offer["discounted-price"] || offer.price)}
                      boardType={boardInfo ? boardInfo.name : 'Special Offer'}
                      isRefundable={offer['is-refundable']}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-slate-500">
                    Sorry, no offers were found for the selected dates.
                  </p>
                  <p className="text-md text-slate-400 mt-2">
                    Please try searching for different dates.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Book Your Stay
              </h1>
              <p className="mt-2 text-slate-500">
                Select your dates and preferences to find the perfect room.
              </p>
            </div>
            <BookingForm />
          </div>
        )}
      </div>
    </div>
  );
}