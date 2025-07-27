
import Image from 'next/image';
import { hotelConfig } from '../../../hotel.config';

export default function AboutSection() {
    return (
        <section id="about" className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Text Content - All data is now from hotelConfig */}
                    <div className="text-left">
                        <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                            {hotelConfig.aboutSection.tagline}
                        </h3>
                        <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                            {hotelConfig.aboutSection.title}
                        </h2>
                        <p className="mt-6 text-lg text-slate-600">
                            {hotelConfig.aboutSection.description}
                        </p>
                        
                        {/* Features List - Dynamically generated from hotelConfig.features */}
                        <div className="mt-8 space-y-6">
                            {hotelConfig.features.map((feature) => (
                                <div key={feature.id} className="flex items-start space-x-4">
                                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                                        {/* Renders the icon component directly from the config file */}
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-800">{feature.title}</h4>
                                        <p className="text-slate-500 mt-1">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image - Image source is from hotelConfig */}
                    <div className="relative h-96 md:h-full w-full">
                        <Image
                            src={hotelConfig.aboutSection.image}
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