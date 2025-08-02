"use client";

import { motion } from 'framer-motion';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import ServicesSection from '@/components/sections/ServiceSection';
import RoomsSection from '@/components/sections/RoomSection';
import Header from '@/components/layout/Header'; // The Header is also a Client Component.

/**
 * A client-side wrapper responsible for orchestrating the "scroll-into-view" 
 * animations for the main content sections of the homepage.
 */
export default function PageSections() {
    return (
        <>
            {/* The Header is a client component, so it lives here with other client components. */}
            <Header />

            {/* Each section is wrapped in a motion.div to control its entry animation. */}
            <motion.div
                initial={{ opacity: 0, y: 100, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <AboutSection />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <RoomsSection />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <ServicesSection />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <ContactSection />
            </motion.div>
        </>
    )
}