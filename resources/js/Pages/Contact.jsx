import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import Button from '../Components/Button';
import SectionHeader from '../Components/SectionHeader';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaHeadset, FaUsers, FaRocket } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact({ auth }) {
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', subject: '', message: '', inquiry_type: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            setFormData({ name: '', email: '', company: '', subject: '', message: '', inquiry_type: 'general' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const contactInfo = [
        { icon: <FaEnvelope className="w-6 h-6 text-blue-600" />, title: "Email Us", details: "support@texport.com", description: "Send us an email anytime" },
        { icon: <FaPhone className="w-6 h-6 text-blue-600" />, title: "Call Us", details: "+1 (555) 123-4567", description: "Mon-Fri from 8am to 6pm PST" },
        { icon: <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />, title: "Visit Us", details: "123 Business Ave, San Francisco, CA 94105", description: "Come say hello at our office" },
        { icon: <FaClock className="w-6 h-6 text-blue-600" />, title: "Business Hours", details: "Monday - Friday: 8am - 6pm PST", description: "We're here to help during business hours" }
    ];

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'sales', label: 'Sales & Pricing' },
        { value: 'support', label: 'Technical Support' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'media', label: 'Media & Press' }
    ];

    const supportOptions = [
        { icon: <FaHeadset className="w-8 h-8 text-blue-600" />, title: "24/7 Support", description: "Get help anytime with our round-the-clock support team.", action: "Chat Now" },
        { icon: <FaUsers className="w-8 h-8 text-blue-600" />, title: "Community Forum", description: "Connect with other users and find answers in our community.", action: "Join Forum" },
        { icon: <FaRocket className="w-8 h-8 text-blue-600" />, title: "Schedule Demo", description: "Book a personalized demo to see TexPort in action.", action: "Book Demo" }
    ];

    return (
        <>
            <Head title="Contact Us - TexPort">
                <meta name="description" content="Get in touch with TexPort. Contact our support team via email, phone, or chat. We're here to help with sales, support, and partnership inquiries." />
                <meta name="keywords" content="contact texport, customer support, sales inquiry, help center, business contact" />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                Get in <span className="text-blue-600">Touch</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32 -mt-16">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Your full name" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="your@email.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Your company name" />
                                    </div>
                                    <div>
                                        <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                                        <select id="inquiry_type" name="inquiry_type" value={formData.inquiry_type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                                            {inquiryTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Brief description of your inquiry" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none" placeholder="Tell us more about your inquiry..." />
                                    </div>
                                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                    <div className="space-y-6">
                                        {contactInfo.map((info, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">{info.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                                    <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                                                    <p className="text-gray-500 text-sm">{info.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <FaMapMarkerAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">Interactive Map</p>
                                        <p className="text-gray-400 text-sm">San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader title="Other Ways to Get Help" subtitle="Choose the support option that works best for you" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {supportOptions.map((option, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">{option.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">{option.action}</Button>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32">
                    <Container>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
                            <p className="text-xl mb-8 opacity-90">Check out our comprehensive FAQ section for instant answers to common questions.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Browse FAQ</Button>
                                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">Help Center</Button>
                            </div>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}