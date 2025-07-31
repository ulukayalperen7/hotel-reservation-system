import Header from "@/components/layout/Header";
import BookingForm from "@/components/sections/BookingForm";
import RoomCard from "@/components/ui/RoomCard";
// We need both functions now to combine price data with room details.
import { getPriceOffers, getHotelDefinitions } from "@/lib/api";

interface SearchPageProps {
  searchParams: { 
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string; 
  } 
}

/**
 * This page displays either the booking search form or the search results.
 * It reads parameters from the URL to fetch live availability from the API.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { checkIn, checkOut, adults = "1", children = "0" } = await searchParams;
  const userHasSearched = !!checkIn && !!checkOut;

  let priceOffers: any[] = [];
  let allRoomDetails: any[] = []; // This will store general room info like names and images.

  // This code block runs only if checkIn and checkOut exist in the URL.
  if (userHasSearched) {
      try {
          // We call both API endpoints at the same time for better performance.
          const [offersData, definitionsData] = await Promise.all([
              getPriceOffers(checkIn, checkOut, adults, children),
              getHotelDefinitions()
          ]);
          
          // Assign results to our variables if the response is valid.
          if (offersData && Array.isArray(offersData)) {
              priceOffers = offersData;
          }
          if (definitionsData && Array.isArray(definitionsData.roomtype)) {
              allRoomDetails = definitionsData.roomtype;
          }
      } catch (error) {
          // It ensures the page does not crash if an API call fails.
          console.error("Error fetching data on search page:", error);
      }
  }

  /**
   * This helper function cleans HTML tags from text.
   */
  const createSafeDescription = (desc: string) => {
    if (!desc || typeof desc !== "string")
      return "Details for this room are available upon request.";
    return desc.replace(/<[^>]*>?/gm, " ");
  };

  return (
    <>
      <Header />
      <div className="pt-32 bg-white min-h-screen">
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
              <div className="mt-12 grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-8">
                {priceOffers.length > 0 ? (
                  priceOffers.map((offer) => {
                    // For each offer, we find the matching room details from the definitions.
                    const roomInfo = allRoomDetails.find(room => room['room-id'] === offer['room-type-id']);

                    return (
                      <RoomCard
                        key={offer.id}
                        // This 'offerId' is the unique identifier for this specific price offer.
                        // It is passed to the RoomCard so the "Select Offer" button can use it.
                        offerId={offer.id}
                        roomId={offer["room-type-id"]} 
                        // Name and Image come from the 'definitions' data.
                        name={roomInfo ? roomInfo['room-name'] : offer['room-type']} 
                        image={roomInfo ? roomInfo['room-image-url'] : "/placeholder.jpg"}
                        // Price comes from the 'offer' data.
                        price={Math.round(offer["discounted-price"] || offer.price)}
                        description={createSafeDescription(offer.description || offer["rate-type"])}
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
    </>
  );
}