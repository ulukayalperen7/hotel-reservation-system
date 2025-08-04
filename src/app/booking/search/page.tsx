import BookingForm from "@/components/sections/BookingForm";
import RoomCard from "@/components/ui/RoomCard";
import { getPriceOffers, getHotelDefinitions } from "@/lib/api";

type Offer = {
  id: string;
  "room-type-id": number;
  "room-type": string;
  "board-type-id": number;
  price: number;
  "discounted-price"?: number;
  cancellation?: {
    "is-refundable"?: boolean;
  };
};

type RoomDetail = {
  "room-id": number;
  "room-name": string;
  "room-image-url": string;
};

type BoardType = {
  id: number;
  name: string;
};

interface SearchPageProps {
  searchParams: {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  };
}

function calculateNights(checkIn: string, checkOut: string): number {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await the searchParams object itself and destructure its properties.
  const { checkIn, checkOut, adults = "1", children = "0" } = await searchParams;

  const userHasSearched = !!(checkIn && checkOut);

  if (userHasSearched) {
    try {
      const numberOfNights = calculateNights(checkIn, checkOut);

      const [offersData, definitionsData] = await Promise.all([
        getPriceOffers(checkIn, checkOut, adults, children),
        getHotelDefinitions(),
      ]);

      const priceOffers: Offer[] = Array.isArray(offersData) ? offersData : [];
      const allRoomDetails: RoomDetail[] = definitionsData?.roomtype || [];
      const allBoardTypes: BoardType[] = definitionsData?.boardtypes || [];

      return (
        <div className="pt-32 bg-slate-50 min-h-screen">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">Available Offers</h1>
              <p className="mt-2 text-slate-500">
                Showing results for check-in on <strong>{checkIn}</strong> for{" "}
                <strong>{adults}</strong> adult(s) for <strong>{numberOfNights}</strong> night(s).
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {priceOffers.length > 0 ? (
                priceOffers.map((offer) => {
                  const roomInfo = allRoomDetails.find(r => r["room-id"] === offer["room-type-id"]);
                  const boardInfo = allBoardTypes.find(b => b.id === offer["board-type-id"]);
                  const totalPrice = offer["discounted-price"] || offer.price;
                  const nightlyPrice = Math.round(totalPrice / numberOfNights);
                  const checkoutQuery = new URLSearchParams({ offerId: offer.id, checkIn, checkOut, adults, children }).toString();

                  return (
                    <RoomCard
                      key={offer.id}
                      checkoutUrl={`/booking/checkout?${checkoutQuery}`}
                      roomId={offer["room-type-id"]}
                      name={roomInfo?.["room-name"] || offer["room-type"]}
                      image={roomInfo?.["room-image-url"] || "/placeholder.jpg"}
                      price={nightlyPrice}
                      boardType={boardInfo?.name || "Offer"}
                      isRefundable={offer.cancellation?.["is-refundable"]}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-slate-500">Sorry, no offers were found for the selected dates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } catch (error) {
        console.error("Error fetching data on search page:", error);
        return <div className="text-center py-48 text-red-500">Failed to load search results.</div>
    }
  }

  // Returns the default view if no search was made.
  return (
    <div className="pt-32 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Book Your Stay</h1>
            <p className="mt-2 text-slate-500">Select your dates to find the perfect room.</p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  ); 
}