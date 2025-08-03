import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CheckoutPageProps {
  searchParams: { 
    offerId?: string;
  }
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // `await` is removed, as searchParams is a direct object.
  const { offerId } = searchParams;

  if (!offerId) {
    return (
      <div className="text-center py-48">
        <h1 className="text-2xl text-red-500">Error: Offer ID is missing.</h1>
        <p className="text-slate-500">Please go back and select an offer again.</p>
      </div>
    )
  }

  const handleReservation = async () => {
    "use server";
    console.log("Form submitted!");
    console.log("Offer ID:", offerId);
    // TODO: Add logic to gather form data and call createReservation API.
  }

  return (
    // The redundant <Header /> is removed. It's already in layout.tsx.
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
            <div className="space-y-4 text-slate-600">
              <div className="flex justify-between">
                <span>Selected Offer ID:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">{offerId}</span>
              </div>
              <div className="flex justify-between">
                <span>Room Type:</span>
                <span className="font-semibold text-slate-800">Standart (Example)</span>
              </div>
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span className="text-xl font-bold text-slate-900">€688 (Example)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}