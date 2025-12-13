import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import Button from '../Components/Button';
import SectionHeader from '../Components/SectionHeader';
import FeatureCard from '../Components/FeatureCard';
import {
    FaRocket, FaLock, FaMobile, FaBolt, FaCheck, FaUsers, FaChartLine,
    FaCog, FaShieldAlt, FaCloud, FaHeadset, FaStar, FaArrowRight,
    FaPlay, FaQuestionCircle, FaIndustry, FaCalculator, FaClipboardList,
    FaMoneyBillWave, FaBoxes, FaFileInvoice, FaLanguage, FaClock
} from 'react-icons/fa';

export default function LandingPage({ auth }) {
    const features = [
        {
            icon: <FaUsers className="w-8 h-8 text-blue-600" />,
            title: "Staff & Role Management",
            description: "Manage your textile staff with role-based permissions and track attendance efficiently."
        },
        {
            icon: <FaIndustry className="w-8 h-8 text-blue-600" />,
            title: "Worker & Machine Assignment",
            description: "Assign workers to specific machines and track their daily production seamlessly."
        },
        {
            icon: <FaCalculator className="w-8 h-8 text-blue-600" />,
            title: "Automatic Salary Calculation",
            description: "Calculate worker salaries automatically based on production output and generate payslips."
        },
        {
            icon: <FaBoxes className="w-8 h-8 text-blue-600" />,
            title: "Smart Stock Management",
            description: "Automatically manage inventory based on daily production and track stock levels in real-time."
        },
        {
            icon: <FaFileInvoice className="w-8 h-8 text-blue-600" />,
            title: "Party Orders & Invoicing",
            description: "Manage client orders, generate challans, and create professional invoices effortlessly."
        },
        {
            icon: <FaLanguage className="w-8 h-8 text-blue-600" />,
            title: "Multi-Language Support",
            description: "Use the system in English, Gujarati, or Hindi - perfect for local textile market needs."
        }
    ];

    const howItWorks = [
        {
            step: "01",
            title: "Create Account",
            description: "Register your textile business and set up your account in minutes."
        },
        {
            step: "02",
            title: "Add Staff & Workers",
            description: "Add your staff members, workers, and machines to start tracking operations."
        },
        {
            step: "03",
            title: "Track & Automate",
            description: "Record daily production and let the system automatically calculate salaries and manage stock."
        }
    ];

    const testimonials = [
        {
            name: "Rajesh Patel",
            role: "Textile Factory Owner",
            content: "TexPort has completely transformed our textile business. No more manual salary calculations or stock confusion!",
            rating: 5
        },
        {
            name: "Priya Shah",
            role: "Textile Trader",
            content: "The multi-language support and automatic invoicing have made our operations so much smoother.",
            rating: 5
        },
        {
            name: "Amit Kumar",
            role: "Processing Unit Manager",
            content: "Finally, a system that understands textile business needs. Worker management has never been easier!",
            rating: 5
        }
    ];

    const faqs = [
        {
            question: "Is this suitable for small textile businesses?",
            answer: "Absolutely! TexPort is designed for textile businesses of all sizes, from small processing units to large factories."
        },
        {
            question: "How does automatic salary calculation work?",
            answer: "The system tracks daily production for each worker and calculates salaries based on your configured rates, generating payslips automatically."
        },
        {
            question: "Can I use this in my local language?",
            answer: "Yes! TexPort supports English, Gujarati, and Hindi languages to make it easy for local textile market users."
        },
        {
            question: "How does stock management work?",
            answer: "Stock levels are automatically updated based on daily production entries, giving you real-time inventory visibility."
        }
    ];

    return (
        <>
            <Head title="TexPort - Complete Textile Business Management System">
                <meta name="description" content="Manage your textile business digitally with TexPort. Track workers, calculate salaries, manage stock, handle party orders, and generate invoices. Multi-language support included." />
                <meta name="keywords" content="textile business management, worker salary calculation, textile stock management, textile invoicing, textile production tracking, gujarati textile software" />
                <meta property="og:title" content="TexPort - Complete Textile Business Management System" />
                <meta property="og:description" content="Digital solution for textile business owners to manage staff, workers, production, stock, and party orders efficiently." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TexPort - Complete Textile Business Management System" />
                <meta name="twitter:description" content="Digital solution for textile business owners to manage staff, workers, production, stock, and party orders efficiently." />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                    <Container>
                        <div className="relative text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
                                <FaIndustry className="w-4 h-4 mr-2" />
                                Trusted by textile business owners across India
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                Complete
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Textile Business</span>
                                Management
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                                Manage your entire textile business digitally - from worker salaries to stock management, party orders to invoices.
                                Say goodbye to manual records and calculation errors.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                                        Start Managing Your Textile Business
                                        <FaArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                                    <FaPlay className="mr-2 w-5 h-5" />
                                    See How It Works
                                </Button>
                            </div>
                            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                                    No manual calculations
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                                    Multi-language support
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                                    Easy to use
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 lg:py-32 bg-white">
                    <Container>
                        <SectionHeader
                            title="Everything Your Textile Business Needs"
                            subtitle="Comprehensive features designed specifically for textile business management and operations"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="group">
                                    <FeatureCard {...feature} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* How It Works Section */}
                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader
                            title="Get Started in 3 Simple Steps"
                            subtitle="From registration to managing your textile business in minutes"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {howItWorks.map((step, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-8">
                                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                                            <span className="text-2xl font-bold text-white">{step.step}</span>
                                        </div>
                                        {index < howItWorks.length - 1 && (
                                            <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 text-lg">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Use Cases Section */}
                <section className="py-20 lg:py-32 bg-white">
                    <Container>
                        <SectionHeader
                            title="Perfect for Every Textile Business"
                            subtitle="From small processing units to large textile factories, TexPort fits your business size"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                                <FaUsers className="w-12 h-12 text-blue-600 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Small Textile Units</h3>
                                <p className="text-gray-600 mb-6">Perfect for small textile processing units and family-owned textile businesses.</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Up to 20 workers</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Basic production tracking</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Multi-language support</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-200">
                                <FaIndustry className="w-12 h-12 text-purple-600 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Textile Traders</h3>
                                <p className="text-gray-600 mb-6">Ideal for textile traders managing multiple parties and complex order workflows.</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Unlimited parties</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Advanced invoicing</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Order management</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                                <FaIndustry className="w-12 h-12 text-green-600 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Large Textile Factories</h3>
                                <p className="text-gray-600 mb-6">Comprehensive solution for large textile factories with multiple machines and workers.</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Unlimited workers & machines</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Advanced analytics</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Priority support</li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader
                            title="Trusted by Textile Business Owners"
                            subtitle="See what textile business owners have to say about their experience with TexPort"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Pricing Preview Section */}
                {/* <section className="py-20 lg:py-32 bg-white">
                    <Container>
                        <SectionHeader
                            title="Simple, Transparent Pricing"
                            subtitle="Choose the plan that fits your business needs. Upgrade or downgrade anytime."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                                <p className="text-gray-500 mb-6">Perfect for small teams</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">$29</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <Link href="/pricing">
                                    <Button variant="outline" className="w-full mb-6">Get Started</Button>
                                </Link>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Up to 10 users</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Basic features</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Email support</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 transform scale-105 shadow-2xl">
                                <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">Most Popular</div>
                                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                                <p className="text-blue-100 mb-6">Best for growing businesses</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">$79</span>
                                    <span className="text-blue-100">/month</span>
                                </div>
                                <Link href="/pricing">
                                    <Button variant="secondary" className="w-full mb-6 bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
                                </Link>
                                <ul className="space-y-3 text-blue-100">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-400 mr-3" />Up to 100 users</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-400 mr-3" />Advanced features</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-400 mr-3" />Priority support</li>
                                </ul>
                            </div>
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                <p className="text-gray-500 mb-6">For large organizations</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                                </div>
                                <Link href="/contact">
                                    <Button variant="outline" className="w-full mb-6">Contact Sales</Button>
                                </Link>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Unlimited users</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Custom features</li>
                                    <li className="flex items-center"><FaCheck className="w-4 h-4 text-green-500 mr-3" />Dedicated support</li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </section> */}

                {/* FAQ Section */}
                {/* <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader
                            title="Frequently Asked Questions"
                            subtitle="Got questions? We've got answers. Can't find what you're looking for? Contact our support team."
                        />
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start">
                                            <FaQuestionCircle className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section> */}

                {/* Final CTA Section */}
                <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <Container>
                        <div className="relative text-center text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Digitize Your Textile Business?
                            </h2>
                            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                                Join textile business owners who have eliminated manual work and improved efficiency with TexPort.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href={route('register')}>
                                    <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                                        Create Free Account
                                        <FaArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-80">
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 mr-2" />
                                    Easy setup
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 mr-2" />
                                    Multi-language
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="w-4 h-4 mr-2" />
                                    Reliable support
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}
