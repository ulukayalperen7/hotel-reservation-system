"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type AboutSectionProps = {
  data: {
    name?: string;
    description?: string;
    imageUrl?: string;
  } | null;
};

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) {
    return null;
  }

  const { name, description, imageUrl } = data;

  return (
    <motion.section 
      className="py-16 sm:py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="relative w-full h-80 md:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Promotional image for ${name || 'the hotel'}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </motion.div>

        <motion.div 
          className="text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
            ABOUT US
          </h3>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
            {name || "Welcome to Our Hotel"}
          </h2>
          {description && (
            <div
              className="mt-4 text-slate-600 prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}