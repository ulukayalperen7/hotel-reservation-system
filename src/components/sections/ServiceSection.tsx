"use client";

import { motion } from "framer-motion";
import { Award, Clock, Heart } from "lucide-react";

// This is a sample structure for a service item.
// You can replace this with your actual service data if needed.
const services = [
  {
    icon: <Award className="h-8 w-8 text-amber-500" />,
    title: "Luxury Amenities",
    description: "Experience top-tier comfort with our exclusive range of amenities."
  },
  {
    icon: <Clock className="h-8 w-8 text-amber-500" />,
    title: "24/7 Front Desk",
    description: "Our dedicated team is always available to assist you with any request."
  },
  {
    icon: <Heart className="h-8 w-8 text-amber-500" />,
    title: "Unmatched Hospitality",
    description: "We pride ourselves on creating a memorable and welcoming stay for all our guests."
  }
];

export default function ServiceSection() {
  return (
    <motion.section
      id="services"
      className="bg-white py-16 sm:py-24"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
          OUR SERVICES
        </h3>
        <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
          Exceeding Your Expectations
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100/50">
                {service.icon}
              </div>
              <h4 className="mt-6 text-xl font-bold text-slate-800">{service.title}</h4>
              <p className="mt-2 text-slate-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}