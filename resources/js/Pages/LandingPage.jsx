import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import Button from '../Components/Button';
import SectionHeader from '../Components/SectionHeader';
import FeatureCard from '../Components/FeatureCard';
import {
    FaUsers, FaIndustry, FaCalculator, FaBoxes, FaFileInvoice,
    FaLanguage, FaCheck, FaArrowRight, FaPlay, FaStar, FaQuoteLeft
} from 'react-icons/fa';

export default function LandingPage({ auth }) {
    const features = [
        {
            icon: <FaUsers className="w-6 h-6 text-primary-600" />,
            title: "Staff & Role Management",
            description: "Granular access control for admins, managers, and staff. Track attendance and performance with ease."
        },
        {
            icon: <FaIndustry className="w-6 h-6 text-primary-600" />,
            title: "Production Tracking",
            description: "Real-time monitoring of worker output and machine efficiency. Link workers to specific machines."
        },
        {
            icon: <FaCalculator className="w-6 h-6 text-primary-600" />,
            title: "Automated Payroll",
            description: "Eliminate manual errors. System automatically calculates salaries based on piece-rate or fixed wages."
        },
        {
            icon: <FaBoxes className="w-6 h-6 text-primary-600" />,
            title: "Inventory Control",
            description: "Live tracking of fabric stock (Meters/Rolls). Auto-deduct materials based on production entries."
        },
        {
            icon: <FaFileInvoice className="w-6 h-6 text-primary-600" />,
            title: "Billing & Invoicing",
            description: "Generate professional GST-compliant invoices and delivery challans. Share via WhatsApp or Email."
        },
        {
            icon: <FaLanguage className="w-6 h-6 text-primary-600" />,
            title: "Regional Language Support",
            description: "Built for India. Full support for English, Gujarati, and Hindi interfaces."
        }
    ];

    const stats = [
        { value: "10k+", label: "Daily Meters Tracked" },
        { value: "500+", label: "Workers Managed" },
        { value: "99.9%", label: "Uptime Reliability" },
    ];

    return (
        <>
            <Head title="TexPort - Modern Textile Factory Management" />

            <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <Container>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-100 bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                                    <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                                    V 2.0 Now Live
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                                    Smart Manufacturing for the <span className="text-primary-600">Modern Age</span>
                                </h1>
                                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    Streamline your textile production, inventory, and payroll in one unified platform.
                                    Designed specifically for weaving, knitting, and processing units.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link href={route('register')}>
                                        <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 text-base font-semibold shadow-md hover:shadow-lg transition-all rounded-lg">
                                            Start Free Trial
                                            <FaArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:border-primary-600 hover:text-primary-600 px-8 py-3.5 text-base font-semibold rounded-lg bg-white">
                                        <FaPlay className="mr-2 w-3 h-3" />
                                        Watch Demo
                                    </Button>
                                </div>
                                <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center"><FaCheck className="text-secondary-500 mr-2" /> No credit card required</div>
                                    <div className="flex items-center"><FaCheck className="text-secondary-500 mr-2" /> 14-day free trial</div>
                                </div>
                            </div>
                            <div className="relative lg:h-[600px] flex items-center justify-center">
                                {/* Abstract Dashboard Representation */}
                                <div className="relative w-full max-w-lg aspect-square bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    {/* Mock UI Content */}
                                    <div className="p-6 mt-10 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                                <div className="text-xs text-slate-400 mb-1">Total Production</div>
                                                <div className="text-2xl font-bold text-slate-800">12,450 m</div>
                                                <div className="text-xs text-secondary-600 mt-1">↑ 12% vs last week</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                                <div className="text-xs text-slate-400 mb-1">Active Workers</div>
                                                <div className="text-2xl font-bold text-slate-800">42</div>
                                                <div className="text-xs text-slate-500 mt-1">Full capacity</div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex items-end justify-between px-2 pb-2">
                                            {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
                                                <div key={i} className="w-8 bg-primary-100 rounded-t-sm relative group">
                                                    <div className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                                            <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Floating Toast */}
                                    <div className="absolute bottom-8 right-8 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce">
                                        <div className="w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center">
                                            <FaCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-800">Report Generated</div>
                                            <div className="text-xs text-slate-500">Payslips sent to 42 workers</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative Blur */}
                                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Stats Section */}
                <div className="border-y border-slate-200 bg-white">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            {stats.map((stat, index) => (
                                <div key={index} className="py-8 md:px-8 text-center">
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>

                {/* Features Section */}
                <section id="features" className="py-24 bg-slate-50">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your factory</h2>
                            <p className="text-lg text-slate-600">Replace disconnected spreadsheets with a unified system born on the factory floor.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Social Proof/Testimonials */}
                <section className="py-24 bg-white">
                    <Container>
                        <SectionHeader
                            title="Trusted by Modern Manufacturers"
                            subtitle="Join the growing network of digitally enabled textile businesses."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                                <FaQuoteLeft className="text-primary-100 w-10 h-10 absolute top-6 left-6" />
                                <p className="relative z-10 text-lg text-slate-700 italic mb-6 pt-6">
                                    "Since switching to TexPort, our payroll processing time dropped from 3 days to 30 minutes. The worker production accuracy has improved significantly."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">RP</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Rajesh Patel</div>
                                        <div className="text-sm text-slate-500">Director, Omkar Mills</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                                <FaQuoteLeft className="text-primary-100 w-10 h-10 absolute top-6 left-6" />
                                <p className="relative z-10 text-lg text-slate-700 italic mb-6 pt-6">
                                    "The inventory tracking is a lifesaver. We know exactly how much yarn and fabric we have in real-time. Highly recommended for surat textile market."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">AK</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Amit Kumar</div>
                                        <div className="text-sm text-slate-500">Manager, Shiv Shakti Textiles</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* CTA Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <Container>
                        <div className="relative z-10 text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to digitize your production?</h2>
                            <p className="text-xl text-slate-300 mb-10">Join 100+ factories running efficiently on TexPort.</p>
                            <Link href={route('register')}>
                                <Button size="lg" className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 text-lg font-bold rounded-lg shadow-xl shadow-primary-900/20 transform hover:-translate-y-1 transition-all">
                                    Create Free Account
                                </Button>
                            </Link>
                            <p className="mt-6 text-sm text-slate-400">Limited time offer: Get 1 month free on annual plan.</p>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}

// Simple internal components if not imported, though we imported them.
// We assume Navbar, Footer, Container, Button, SectionHeader, FeatureCard support className overrides or generic enough.
