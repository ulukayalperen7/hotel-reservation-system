import { hotelConfig } from "../../../hotel.config";


export default function ServicesSection() {
    return (
        // The 'id' is for the navigation link in the header.
        <section id="services" className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6 text-center">
                
                {/* Section Header */}
                <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                    Our Facilities
                </h3>
                <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
                    Services We Provide
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                    We offer a wide range of services to make your stay as comfortable and enjoyable as possible, from relaxation to fine dining.
                </p>

                {/* Services Grid */}
                {/* Responsive grid: 2 columns on small screens, 4 on larger screens. */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Mapping over the 'services' array from our config file. */}
                    {hotelConfig.services.map((service) => (
                        <div key={service.id} className="text-center">
                            {/* The service icon with styling */}
                            <div className="mx-auto bg-amber-100 text-amber-600 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:text-white hover:scale-110">
                                <service.icon size={48} strokeWidth={1.5} />
                            </div>
                            {/* The service name */}
                            <h4 className="mt-6 text-xl font-bold text-slate-800">{service.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}