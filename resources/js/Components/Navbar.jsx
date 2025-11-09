import { Link } from '@inertiajs/react';
import Container from './Container';
import Button from './Button';

export default function Navbar({ auth }) {
    return (
        <nav className="bg-background shadow-sm border-b border-neutral">
            <Container>
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        {/* <Link href={route('home')} className="text-2xl font-bold text-primary">TexPort</Link> */}
                        <Link
                            href={route("home")}
                            className="text-2xl font-bold text-primary"
                        >
                            <img
                                src="assets/logo/logo_dark.png"
                                alt="TexPort"
                                className="h-8"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="#features"
                            className="text-text hover:text-primary transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="text-text hover:text-primary transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="text-text hover:text-primary transition-colors"
                        >
                            Contact
                        </a>

                        {auth?.user ? (
                            <Link href={route("dashboard")}>
                                <Button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 text-sm">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex space-x-2">
                                <Link href={route("login")}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 text-sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </nav>
    );
}
