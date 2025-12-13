import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import SectionHeader from '../Components/SectionHeader';
import { FaUsers, FaRocket, FaHeart, FaGlobe, FaAward, FaLightbulb } from 'react-icons/fa';

export default function About({ auth }) {
    const values = [
        {
            icon: <FaLightbulb className="w-8 h-8 text-blue-600" />,
            title: "Innovation",
            description: "We constantly push boundaries to deliver cutting-edge solutions that drive business transformation."
        },
        {
            icon: <FaUsers className="w-8 h-8 text-blue-600" />,
            title: "Customer First",
            description: "Our customers' success is our success. We build lasting relationships through exceptional service."
        },
        {
            icon: <FaHeart className="w-8 h-8 text-blue-600" />,
            title: "Integrity",
            description: "We operate with transparency, honesty, and ethical practices in everything we do."
        },
        {
            icon: <FaGlobe className="w-8 h-8 text-blue-600" />,
            title: "Global Impact",
            description: "We're committed to making a positive impact on businesses and communities worldwide."
        }
    ];

    const team = [
        {
            name: "Alex Johnson",
            role: "CEO & Founder",
            bio: "Visionary leader with 15+ years in enterprise software development.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        },
        {
            name: "Sarah Chen",
            role: "CTO",
            bio: "Technology expert passionate about scalable solutions and innovation.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
        },
        {
            name: "Michael Rodriguez",
            role: "Head of Product",
            bio: "Product strategist focused on user experience and business value.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
            name: "Emily Davis",
            role: "VP of Customer Success",
            bio: "Customer advocate ensuring every client achieves their goals.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
        }
    ];

    const stats = [
        { number: "10,000+", label: "Happy Customers" },
        { number: "50+", label: "Countries Served" },
        { number: "99.9%", label: "Uptime Guarantee" },
        { number: "24/7", label: "Customer Support" }
    ];

    return (
        <>
            <Head title="About Us - TexPort">
                <meta name="description" content="Learn about TexPort's mission to transform business operations. Founded in 2020, we serve 10,000+ businesses worldwide with innovative solutions." />
                <meta name="keywords" content="about texport, company story, business solutions, team, mission, vision" />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                About <span className="text-blue-600">TexPort</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                We're on a mission to transform how businesses operate by providing 
                                innovative solutions that streamline workflows and drive growth.
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Story Section */}
                <section className="py-20 lg:py-32">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Founded in 2020, TexPort emerged from a simple observation: businesses 
                                    were struggling with fragmented tools and inefficient processes that 
                                    hindered their growth potential.
                                </p>
                                <p className="text-lg text-gray-600 mb-6">
                                    Our founders, having experienced these challenges firsthand in their 
                                    previous ventures, set out to create a unified platform that would 
                                    simplify business operations while providing the flexibility to scale.
                                </p>
                                <p className="text-lg text-gray-600">
                                    Today, we're proud to serve over 10,000 businesses worldwide, helping 
                                    them achieve operational excellence and sustainable growth.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <FaRocket className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                                    <p className="text-gray-700 font-medium text-lg">Launched in 2020</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To empower businesses of all sizes with intuitive, powerful tools 
                                    that eliminate operational friction and unlock their full potential 
                                    for growth and innovation.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To become the world's most trusted platform for business operations, 
                                    enabling millions of organizations to achieve sustainable success 
                                    through technology-driven efficiency.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Values Section */}
                <section className="py-20 lg:py-32">
                    <Container>
                        <SectionHeader
                            title="Our Values"
                            subtitle="The principles that guide everything we do"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Stats Section */}
                <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Container>
                        <div className="text-center text-white mb-16">
                            <h2 className="text-3xl font-bold mb-4">Trusted by Businesses Worldwide</h2>
                            <p className="text-xl opacity-90">Numbers that speak to our impact</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center text-white">
                                    <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-lg opacity-90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Team Section */}
                <section className="py-20 lg:py-32">
                    <Container>
                        <SectionHeader
                            title="Meet Our Team"
                            subtitle="The passionate people behind TexPort's success"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-6">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Awards Section */}
                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader
                            title="Recognition & Awards"
                            subtitle="Industry recognition for our innovation and excellence"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                                <FaAward className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Best SaaS Platform 2024</h3>
                                <p className="text-gray-600">TechCrunch Awards</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                                <FaAward className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Excellence</h3>
                                <p className="text-gray-600">Business Technology Awards</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                                <FaAward className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Choice Award</h3>
                                <p className="text-gray-600">Software Review Platform</p>
                            </div>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}