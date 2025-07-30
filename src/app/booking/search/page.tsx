
import Header from "@/components/layout/Header";
import BookingForm from "@/components/sections/BookingForm";

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | undefined } 
}) {
    // await the special Next.js searchParams
    const { checkIn, checkOut, adults } = await searchParams;

    const userHasSearched = !!checkIn && !!checkOut;

    return (
        <>
            <Header />
            <div className="pt-32 bg-white min-h-screen"> 
                <div className="container mx-auto px-6 py-12">
                    {userHasSearched ? (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-slate-900">
                              Available Rooms
                            </h1>
                            <p className="mt-2 text-slate-500">
                              Showing results for check‑in on <strong>{checkIn}</strong>{" "}
                              for <strong>{adults}</strong> adults.
                            </p>

                            <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                                <p className="text-gray-500">API Room Results Will Appear Here</p>
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
