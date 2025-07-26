import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Award, Coffee, Wifi } from 'lucide-react';

// This is a reusable component for displaying features.
const FeatureItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
            <p className="text-slate-500 mt-1">{children}</p>
        </div>
    </div>
);


export default function AboutSection() {
    return (
        // The 'id' allows the header links to scroll to this section.
        <section id="about" className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6">
                {/* A grid system for the two-column layout. It stacks on small screens. */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="text-left">
                        <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                            A Legacy of Luxury
                        </h3>
                        <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                            Welcome to Talya Hotel Resort & Spa
                        </h2>
                        <p className="mt-6 text-lg text-slate-600">
                            Discover a world where modern luxury and blissful comfort converge. Located in a prime spot, Talya Hotel offers an unparalleled experience with its sophisticated design, world-class amenities, and a deep commitment to guest satisfaction.
                        </p>
                        
                        {/* Features List */}
                        <div className="mt-8 space-y-6">
                            <FeatureItem icon={<Award size={24} />} title="Award-Winning Service">
                                Recognized for our exceptional hospitality and attention to detail.
                            </FeatureItem>
                            <FeatureItem icon={<Coffee size={24} />} title="Gourmet Dining">
                                Savor exquisite flavors crafted by our world-renowned chefs.
                            </FeatureItem>
                            <FeatureItem icon={<Wifi size={24} />} title="Complimentary Wi-Fi">
                                Stay connected with high-speed internet access throughout the resort.
                            </FeatureItem>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative h-96 md:h-full w-full">
                        {/* The Next.js Image component provides automatic image optimization. */}
                        <Image
                            src="/about-image.jpg" // IMPORTANT: This file must be in the /public folder.
                            alt="Luxury hotel lobby with elegant decor"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}