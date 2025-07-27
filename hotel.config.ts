import { Award, Coffee, Wifi, Waves, Wind, UtensilsCrossed, Dumbbell, Sparkles } from 'lucide-react';

export const hotelConfig = {

    name: "Talya Hotel",
    contact: {
        phone: "1-888-123-4567",
        email: "contact@talya.com"
    },
    socialLinks: {
        instagram: "#",
        twitter: "#",
        linkedin: "#"
    },

    navLinks: [
        { href: '/#about', label: 'About' },
        { href: '/#rooms', label: 'Rooms' },
        { href: '/#services', label: 'Services' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/#contact', label: 'Contact' }
    ],

    // Data for the hero slider on the homepage
    heroSlides: [
        { src: '/hero-1.jpg', title: 'Unforgettable Stays, Unbeatable Prices' },
        { src: '/hero-2.jpg', title: 'Your Private Paradise Awaits' },
        { src: '/hero-3.jpg', title: 'Experience Culinary Excellence' },
    ],

    // Data for the "About Us" section
    aboutSection: {
        tagline: "A Legacy of Luxury",
        title: "Welcome to Talya Hotel Resort & Spa",
        description: "Discover a world where modern luxury and blissful comfort converge. Located in a prime spot, Talya Hotel offers an unparalleled experience with its sophisticated design, world-class amenities, and a deep commitment to guest satisfaction.",
        image: "/about-image.jpg"
    },

    // RENAMED: Features specifically for the About Us section
    aboutFeatures: [
        {
            id: 'service',
            icon: Award,
            title: "Award-Winning Service",
            description: "Recognized for our exceptional hospitality and attention to detail."
        },
        {
            id: 'dining',
            icon: UtensilsCrossed,
            title: "Gourmet Dining",
            description: "Savor exquisite flavors crafted by our world-renowned chefs."
        },
        {
            id: 'wifi',
            icon: Wifi,
            title: "Complimentary Wi-Fi",
            description: "Stay connected with high-speed internet access throughout the resort."
        }
    ],

    // A list of available rooms.
    rooms: [
        { id: 'single', name: "Single Room", price: 89, image: "/rooms/single.jpg", description: "Perfect for the solo traveler, offering comfort and style in a compact space." },
        { id: 'double', name: "Double Room", price: 129, image: "/rooms/double.jpg", description: "Spacious and elegant, ideal for couples seeking a memorable getaway." },
        { id: 'deluxe', name: "Deluxe Suite", price: 189, image: "/rooms/deluxe.jpg", description: "The pinnacle of luxury with stunning views and premium amenities for an exclusive stay." }
    ],
    // fro gallery page
    galleryImages: [
        { id: 1, src: '/gallery/photo-1.jpg', alt: 'Hotel Lobby' },
        { id: 2, src: '/gallery/photo-3.jpg', alt: 'Poolside View' },
        { id: 3, src: '/gallery/photo-5.jpg', alt: 'Restaurant Interior' },
        { id: 4, src: '/gallery/photo-10.jpg', alt: 'Deluxe Room View' },
        { id: 5, src: '/gallery/photo-7.jpg', alt: 'Hotel Exterior' },
        { id: 6, src: '/gallery/photo-9.jpg', alt: 'Spa and Wellness Center' },
        { id: 7, src: '/gallery/photo-2.jpg', alt: 'Our Guests' },
        { id: 8, src: '/gallery/photo-6.jpg', alt: 'Pool 2' },
    ],

    services: [
        { id: 'pool', icon: Waves, name: 'Infinity Pool' },
        { id: 'spa', icon: Sparkles, name: 'Wellness & Spa' },
        { id: 'fitness', icon: Dumbbell, name: 'Fitness Center' },
        { id: 'restaurant', icon: UtensilsCrossed, name: 'Fine Dining' }
    ]
};