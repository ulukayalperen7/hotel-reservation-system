import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Define the type for the props that this component will accept.
// This makes our component type-safe and easier to use.
type RoomCardProps = {
    name: string;
    price: number;
    image: string;
    description: string;
};

export default function RoomCard({ name, price, image, description }: RoomCardProps) {
    return (
        // The main container for the card with a border, shadow, and rounded corners.
        // 'group' is used to enable hover effects on child elements.
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative w-full h-56">
                {/* The Next.js Image component handles image optimization. */}
                <Image
                    src={image}
                    alt={`Photo of the ${name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                {/* The price tag, positioned absolutely over the image. */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    €{price} / night
                </div>
            </div>
            
            {/* The text content area of the card. */}
            <div className="p-6 text-left">
                <h3 className="text-2xl font-bold text-slate-800">{name}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed h-16">
                    {description}
                </p>
                <Button variant="outline" className="mt-4 w-full border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors group">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
    );
}