import { getPriceOffers, getHotelDefinitions } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function calculateNights(checkIn: string, checkOut: string): number {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
}

interface CheckoutPageProps {
  searchParams: { 
    offerId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // Await the searchParams object itself and destructure its properties.
  const { offerId, checkIn, checkOut, adults, children = "0" } = await searchParams;

  if (!offerId || !checkIn || !checkOut || !adults) {
    return (
      <div className="text-center py-48">
        <h1 className="text-2xl text-red-500">Error: Missing Information.</h1>
        <p className="text-slate-500">Please go back to the search page and select an offer again.</p>
      </div>
    );
  }

  try {
    const [offersData, definitionsData] = await Promise.all([
      getPriceOffers(checkIn, checkOut, adults, children),
      getHotelDefinitions()
    ]);
    
    const selectedOffer = offersData.find((o: any) => o.id === offerId);

    if (!selectedOffer) {
      return (
        <div className="text-center py-48">
          <h1 className="text-2xl text-red-500">Error: Offer Not Found</h1>
          <p className="text-slate-500">This offer may have expired. Please search again.</p>
        </div>
      );
    }

    const roomInfo = definitionsData.roomtype.find((r: any) => r['room-id'] === selectedOffer['room-type-id']);
    const boardInfo = definitionsData.boardtypes.find((b: any) => b.id === selectedOffer['board-type-id']);
    const totalPrice = selectedOffer['discounted-price'] || selectedOffer.price;
    const numberOfNights = calculateNights(checkIn, checkOut);

    const handleReservation = async () => {
      "use server";
      console.log("Form submitted!");
      console.log("Offer ID:", offerId);
    }

    return (
      <div className="bg-slate-50">
        <div className="container mx-auto max-w-4xl px-6 pt-32 pb-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900">Finalize Your Reservation</h1>
            <p className="mt-2 text-lg text-slate-500">Just a few more details to complete your booking.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className='bg-white p-8 rounded-lg shadow-md border border-slate-200'>
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-6">Guest Information</h2>
              <form action={handleReservation} className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" type="text" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" required />
                </div>
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3">
                    Complete Reservation
                  </Button>
                </div>
              </form>
            </div>
            
            <div className='bg-white p-8 rounded-lg shadow-md border border-slate-200 self-start'>
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-6">Booking Summary</h2>
              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Room Type:</span>
                  <span className="font-semibold text-slate-800">{roomInfo?.['room-name'] || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Board Type:</span>
                  <span className="font-semibold text-slate-800">{boardInfo?.name || 'N/A'}</span>
                </div>
                <hr className="my-2"/>
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-semibold text-slate-800">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-semibold text-slate-800">{checkOut}</span>
                </div>
                 <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800">{numberOfNights} night(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-semibold text-slate-800">{adults} Adult(s)</span>
                </div>
                <hr className="my-2"/>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">Total Price:</span>
                  <span className="text-2xl font-bold text-slate-900">€{totalPrice}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to render checkout page:", error);
    return (
      <div className="text-center py-48">
        <h1 className="text-2xl text-red-500">An Unexpected Error Occurred</h1>
        <p className="text-slate-500">We couldn't load your booking details. Please try again.</p>
      </div>
    );
  }
}