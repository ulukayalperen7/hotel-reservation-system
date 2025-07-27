import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Phone, Mail } from 'lucide-react';
import { hotelConfig } from '../../../hotel.config';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Column 1: About the Hotel */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-4">{hotelConfig.name}</h3>
                        <p className="text-sm text-slate-400">
                            Providing a luxurious experience with world-class amenities and exceptional service. Your perfect getaway awaits.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href={hotelConfig.socialLinks.instagram} aria-label="Instagram" className="text-slate-400 hover:text-white"><FaInstagram size={20} /></a>
                            <a href={hotelConfig.socialLinks.twitter} aria-label="Twitter" className="text-slate-400 hover:text-white"><FaXTwitter size={20} /></a>
                            <a href={hotelConfig.socialLinks.linkedin} aria-label="LinkedIn" className="text-slate-400 hover:text-white"><FaLinkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/#about" className="text-sm text-slate-400 hover:text-white hover:underline">About Us</Link></li>
                            <li><Link href="/#rooms" className="text-sm text-slate-400 hover:text-white hover:underline">Rooms</Link></li>
                            <li><Link href="/#services" className="text-sm text-slate-400 hover:text-white hover:underline">Services</Link></li>
                            <li><Link href="/#contact" className="text-sm text-slate-400 hover:text-white hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal Links */}
                    <div>
                         <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-400 hover:text-white hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-white hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Phone size={16} className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                                <a href={`tel:${hotelConfig.contact.phone}`} className="text-sm text-slate-400 hover:text-white">{hotelConfig.contact.phone}</a>
                            </li>
                            <li className="flex items-start">
                                <Mail size={16} className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                                <a href={`mailto:${hotelConfig.contact.email}`} className="text-sm text-slate-400 hover:text-white">{hotelConfig.contact.email}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar with Copyright */}
            <div className="bg-slate-900 py-4">
                <div className="container mx-auto px-6 text-center text-xs text-slate-500">
                    © {currentYear} {hotelConfig.name}. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}