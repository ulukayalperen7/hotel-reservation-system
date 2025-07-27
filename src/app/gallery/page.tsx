import Header from "@/components/layout/Header";
import Image from "next/image";
import { hotelConfig } from "../../../hotel.config";

export default function GalleryPage() {
    return (
        <>
            {/* The Header component must be manually added to new pages */}
            <Header />

            {/* A container to give some space from the top header */}
            <div className="pt-24 bg-white"> 
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Gallery</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                            Explore the stunning visuals of our resort, from elegant rooms to breathtaking views.
                        </p>
                    </div>

                    {/* Responsive image grid */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {hotelConfig.galleryImages.map((image) => (
                            <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}