// File: app/booking/search/page.tsx

import Header from "@/components/layout/Header";
import BookingForm from "@/components/sections/BookingForm"; // We will reuse our form component

// This function checks if the required search parameters exist in the URL.
const hasSearchParams = (searchParams: { [key: string]: string | undefined }): boolean => {
    return !!searchParams.checkIn && !!searchParams.checkOut;
};

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    // Check if the user came with pre-filled dates or not.
    const userHasSearched = hasSearchParams(searchParams);
    
    return (
        <>
            <Header />
            <div className="pt-32 bg-white min-h-screen"> 
                <div className="container mx-auto px-6 py-12">
                    
                    {/* This is a conditional rendering block. */}
                    {/* It decides what to show based on whether the user has already searched. */}

                    {userHasSearched ? (
                        // SCENARIO A: User has searched from the homepage.
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-slate-900">Available Rooms</h1>
                            <p className="mt-2 text-slate-500">
                                Showing results for check-in on <strong>{searchParams.checkIn}</strong> for <strong>{searchParams.adults}</strong> adults.
                            </p>
                            
                            {/* TODO: Room results from the API will be listed here. */}
                            <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                                <p className="text-gray-500">API Room Results Will Appear Here</p>
                            </div>
                        </div>

                    ) : (
                        // SCENARIO B: User clicked "Book Now" and needs to search.
                        <div className="max-w-4xl mx-auto">
                             <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-slate-900">Book Your Stay</h1>
                                <p className="mt-2 text-slate-500">
                                    Select your dates and preferences to find the perfect room.
                                </p>
                             </div>
                            {/* We are reusing the BookingForm component here. */}
                            <BookingForm />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}