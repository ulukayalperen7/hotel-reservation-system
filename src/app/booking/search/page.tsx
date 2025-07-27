import Header from "@/components/layout/Header";

// 'searchParams' is automatically passed as a prop by Next.js
// It contains the query parameters from the URL.
export default function SearchPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    const checkIn = searchParams.checkIn || 'Not selected';
    const checkOut = searchParams.checkOut || 'Not selected';
    const adults = searchParams.adults || 'Not selected';
    
    return (
        <>
            <Header />
            <div className="pt-24 bg-white"> 
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-slate-900">Search for Available Rooms</h1>
                        <p className="mt-4 text-lg text-slate-500">
                            You searched for check-in: <strong>{checkIn}</strong> and check-out: <strong>{checkOut}</strong> for <strong>{adults}</strong> adults.
                        </p>
                    </div>
                    {/* Room results will be displayed here later */}
                </div>
            </div>
        </>
    );
}