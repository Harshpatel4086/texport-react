import { Link } from '@inertiajs/react';
import Container from './Container';
import Button from './Button';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <Container>
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link
                            href={route("home")}
                            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
                        >
                            <img
                                src="assets/logo/logo_dark.png"
                                alt="TexPort"
                                className="h-8"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Features
                        </a>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            About
                        </Link>
                        {/* <Link
                            href="/pricing"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Pricing
                        </Link> */}
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Contact
                        </Link>

                        {auth?.user ? (
                            <Link href={route("dashboard")}>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href={route("login")}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-medium"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                        Get Started Free
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                        >
                            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#features"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </a>
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            {/* <Link
                                href="/pricing"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link> */}
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>

                            <div className="pt-4 border-t border-gray-100">
                                {auth?.user ? (
                                    <Link href={route("dashboard")}>
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col space-y-3">
                                        <Link href={route("login")}>
                                            <Button
                                                variant="outline"
                                                className="w-full border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-medium"
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href={route("register")}>
                                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                                                Get Started Free
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </nav>
    );
}
