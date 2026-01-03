import Container from './Container';
import { Link } from '@inertiajs/react';
import { LogoFull } from './Logo';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <Container>
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6 bg-white/10 w-fit p-3 rounded-lg backdrop-blur-sm">
                                <LogoFull className="h-8" />
                            </div>
                            <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
                                Empowering businesses worldwide with innovative solutions that streamline operations, 
                                boost productivity, and drive sustainable growth.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Product</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#features" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <Link href="/pricing" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        API Documentation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Status Page
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center">
                                <FaEnvelope className="w-5 h-5 text-blue-500 mr-3" />
                                <span className="text-gray-400">support@texport.com</span>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="w-5 h-5 text-blue-500 mr-3" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mr-3" />
                                <span className="text-gray-400">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            &copy; 2024 TexPort. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
