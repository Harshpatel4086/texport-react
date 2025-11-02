import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import Button from '../Components/Button';
import SectionHeader from '../Components/SectionHeader';
import FeatureCard from '../Components/FeatureCard';

export default function LandingPage({ auth }) {
    const features = [
        {
            icon: "🚀",
            title: "Fast Performance",
            description: "Lightning-fast loading times and optimized performance for the best user experience."
        },
        {
            icon: "🔒",
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guarantee and data protection."
        },
        {
            icon: "📱",
            title: "Mobile Responsive",
            description: "Perfectly optimized for all devices - desktop, tablet, and mobile."
        },
        {
            icon: "⚡",
            title: "Easy Integration",
            description: "Simple setup process with comprehensive documentation and support."
        }
    ];

    return (
        <>
            <Head title="TexPort - Modern Solutions" />
            
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />
                
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                Modern Solutions for
                                <span className="text-blue-600"> Your Business</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Transform your workflow with our cutting-edge platform. Built for performance, 
                                designed for simplicity, and crafted for success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg">Get Started Free</Button>
                                <Button variant="outline" size="lg">Watch Demo</Button>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-gray-50">
                    <Container>
                        <SectionHeader 
                            title="Why Choose TexPort?"
                            subtitle="Discover the features that make us the preferred choice for modern businesses"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </Container>
                </section>

                {/* About Section */}
                <section id="about" className="py-20">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Built for the Future of Business
                                </h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Our platform combines innovative technology with user-friendly design 
                                    to deliver exceptional results. We understand the challenges modern 
                                    businesses face and have created solutions that adapt to your needs.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">24/7 Customer Support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">Advanced Analytics</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">Scalable Infrastructure</span>
                                    </li>
                                </ul>
                                <Button>Learn More</Button>
                            </div>
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg p-8 h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 font-medium">Powerful Technology</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* CTA Section */}
                <section id="contact" className="py-20 bg-blue-600">
                    <Container>
                        <div className="text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Join thousands of satisfied customers and transform your business today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="secondary" size="lg">
                                    Start Free Trial
                                </Button>
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}