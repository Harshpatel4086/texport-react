import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Container from '../Components/Container';
import Button from '../Components/Button';
import SectionHeader from '../Components/SectionHeader';
import { FaCheck, FaTimes, FaQuestionCircle, FaStar } from 'react-icons/fa';
import { useState } from 'react';

export default function Pricing({ auth }) {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: "Starter", description: "Perfect for small teams getting started", monthlyPrice: 29, annualPrice: 290,
            features: ["Up to 10 users", "Basic dashboard", "Email support", "5GB storage", "Basic integrations", "Mobile app access"],
            limitations: ["Advanced analytics", "Custom integrations", "Priority support", "Advanced security"], popular: false, cta: "Start Free Trial"
        },
        {
            name: "Professional", description: "Best for growing businesses", monthlyPrice: 79, annualPrice: 790,
            features: ["Up to 100 users", "Advanced dashboard", "Priority support", "50GB storage", "All integrations", "Mobile app access", "Advanced analytics", "Custom workflows", "API access"],
            limitations: ["White-label options", "Dedicated support"], popular: true, cta: "Start Free Trial"
        },
        {
            name: "Enterprise", description: "For large organizations", monthlyPrice: "Custom", annualPrice: "Custom",
            features: ["Unlimited users", "Enterprise dashboard", "Dedicated support", "Unlimited storage", "Custom integrations", "Mobile app access", "Advanced analytics", "Custom workflows", "Full API access", "White-label options", "SSO integration", "Advanced security", "Custom training"],
            limitations: [], popular: false, cta: "Contact Sales"
        }
    ];

    const faqs = [
        { question: "Can I change plans anytime?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments." },
        { question: "Is there a free trial?", answer: "Yes! We offer a 14-day free trial for all paid plans. No credit card required to start your trial." },
        { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer." },
        { question: "Do you offer refunds?", answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund within 30 days of purchase." },
        { question: "Can I cancel anytime?", answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your access continues until the end of your billing period." },
        { question: "Do you offer discounts for nonprofits?", answer: "Yes, we offer special pricing for qualified nonprofit organizations and educational institutions. Contact our sales team for details." }
    ];

    const getPrice = (plan) => plan.monthlyPrice === "Custom" ? "Custom" : isAnnual ? `$${plan.annualPrice}` : `$${plan.monthlyPrice}`;
    const getPeriod = () => isAnnual ? "/year" : "/month";
    const getSavings = (plan) => {
        if (plan.monthlyPrice === "Custom") return null;
        const monthlyCost = plan.monthlyPrice * 12;
        const savings = monthlyCost - plan.annualPrice;
        return Math.round((savings / monthlyCost) * 100);
    };

    return (
        <>
            <Head title="Pricing - TexPort">
                <meta name="description" content="Simple, transparent pricing for TexPort. Choose from Starter ($29/mo), Professional ($79/mo), or Enterprise plans. 14-day free trial, no credit card required." />
                <meta name="keywords" content="texport pricing, business software pricing, saas pricing, subscription plans, free trial" />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                Simple, Transparent <span className="text-blue-600">Pricing</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Choose the perfect plan for your business. Start with a free trial, upgrade anytime, and scale as you grow.
                            </p>
                            
                            <div className="flex items-center justify-center mb-12">
                                <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Monthly</span>
                                <button onClick={() => setIsAnnual(!isAnnual)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                                <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Annual</span>
                                {isAnnual && <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Save up to 17%</span>}
                            </div>
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32 -mt-16">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {plans.map((plan, index) => (
                                <div key={index} className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-200 hover:shadow-2xl ${plan.popular ? 'border-blue-500 transform scale-105' : 'border-gray-200 hover:border-blue-300'}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                                                <FaStar className="w-4 h-4 mr-1" />Most Popular
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <p className="text-gray-600 mb-6">{plan.description}</p>
                                        
                                        <div className="mb-6">
                                            <div className="flex items-baseline">
                                                <span className="text-4xl font-bold text-gray-900">{getPrice(plan)}</span>
                                                {plan.monthlyPrice !== "Custom" && <span className="text-gray-500 ml-1">{getPeriod()}</span>}
                                            </div>
                                            {isAnnual && getSavings(plan) && <p className="text-green-600 text-sm font-medium mt-1">Save {getSavings(plan)}% annually</p>}
                                        </div>

                                        <div className="mb-8">
                                            {plan.cta === "Contact Sales" ? (
                                                <Link href="/contact">
                                                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`} size="lg">{plan.cta}</Button>
                                                </Link>
                                            ) : (
                                                <Link href={route('register')}>
                                                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`} size="lg">{plan.cta}</Button>
                                                </Link>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                                            {plan.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center">
                                                    <FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                            {plan.limitations.map((limitation, limitationIndex) => (
                                                <div key={limitationIndex} className="flex items-center opacity-50">
                                                    <FaTimes className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-400">{limitation}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32 bg-gray-50">
                    <Container>
                        <SectionHeader title="Compare All Features" subtitle="See exactly what's included in each plan" />
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Professional</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr><td className="px-6 py-4 text-sm text-gray-900">Users</td><td className="px-6 py-4 text-center text-sm text-gray-600">Up to 10</td><td className="px-6 py-4 text-center text-sm text-gray-600">Up to 100</td><td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td></tr>
                                        <tr className="bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">Storage</td><td className="px-6 py-4 text-center text-sm text-gray-600">5GB</td><td className="px-6 py-4 text-center text-sm text-gray-600">50GB</td><td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td></tr>
                                        <tr><td className="px-6 py-4 text-sm text-gray-900">Advanced Analytics</td><td className="px-6 py-4 text-center"><FaTimes className="w-4 h-4 text-gray-400 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td></tr>
                                        <tr className="bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">API Access</td><td className="px-6 py-4 text-center"><FaTimes className="w-4 h-4 text-gray-400 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td></tr>
                                        <tr><td className="px-6 py-4 text-sm text-gray-900">Priority Support</td><td className="px-6 py-4 text-center"><FaTimes className="w-4 h-4 text-gray-400 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td></tr>
                                        <tr className="bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">SSO Integration</td><td className="px-6 py-4 text-center"><FaTimes className="w-4 h-4 text-gray-400 mx-auto" /></td><td className="px-6 py-4 text-center"><FaTimes className="w-4 h-4 text-gray-400 mx-auto" /></td><td className="px-6 py-4 text-center"><FaCheck className="w-4 h-4 text-green-500 mx-auto" /></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className="py-20 lg:py-32">
                    <Container>
                        <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about our pricing" />
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                </section>

                <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Container>
                        <div className="text-center text-white">
                            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Start your free trial today. No credit card required, cancel anytime.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')}><Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Start Free Trial</Button></Link>
                                <Link href="/contact"><Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">Contact Sales</Button></Link>
                            </div>
                        </div>
                    </Container>
                </section>

                <Footer />
            </div>
        </>
    );
}