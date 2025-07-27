'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

export default function ContactSection() {
    return (
        // The 'id' is for the navigation link in the header.
        <section id="contact" className="bg-slate-50 py-16 sm:py-24">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                        Get In Touch
                    </h3>
                    <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900">
                        Contact Us
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                        Have a question or want to book a stay? Fill out the form below, and our team will get back to you shortly.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="mt-16 max-w-3xl mx-auto">
                    {/* We can use a 'form' element here, which is semantically correct.
                        Later, we can add an 'onSubmit' handler for API calls. */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                            <Input id="name" type="text" placeholder="John Doe" />
                        </div>
                        
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </div>

                        {/* Subject Input (Spans full width) */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                            <Input id="subject" type="text" placeholder="e.g., Question about booking" />
                        </div>
                        
                        {/* Message Textarea (Spans full width) */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-700">Your Message</label>
                            <Textarea id="message" placeholder="Please type your message here..." className="min-h-[150px]" />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 text-right">
                             <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3">
                                <Send className="mr-2 h-5 w-5" />
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}