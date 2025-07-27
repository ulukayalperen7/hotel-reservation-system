// This file acts as the single source of truth for all hotel-specific data.
// To configure the site for a different hotel, you would primarily edit this file.

import { Award, Coffee, Wifi, Waves, Wind, UtensilsCrossed } from 'lucide-react';

export const hotelConfig = {
    // General information about the hotel
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

    // A list of available rooms. If a hotel has no Deluxe room, you just remove it from this array.
    rooms: [
        {
            id: 'single',
            name: "Single Room",
            price: 89,
            image: "/rooms/single.jpg", // Placeholder - you'll need to add this image to /public/rooms/
            description: "Perfect for the solo traveler, offering comfort and style in a compact space."
        },
        {
            id: 'double',
            name: "Double Room",
            price: 129,
            image: "/rooms/double.jpg", // Placeholder
            description: "Spacious and elegant, ideal for couples seeking a memorable getaway."
        },
        {
            id: 'deluxe',
            name: "Deluxe Suite",
            price: 189,
            image: "/rooms/deluxe.jpg", // Placeholder
            description: "The pinnacle of luxury with stunning views and premium amenities for an exclusive stay."
        }
    ],

    // A list of features or amenities. If a hotel doesn't offer one, remove it from the array.
    // The icon is the actual component from lucide-react, making it very dynamic.
    features: [
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
};