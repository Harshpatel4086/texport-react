import { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { MdSave, MdArrowBack, MdReceipt, MdPerson, MdFactory, MdCalendarToday, MdAttachMoney } from 'react-icons/md';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

const GlassCard = ({ children, className = '', title, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
        {(title || Icon) && (
            <div className="px-6 py-4 border-b border-white/20 bg-white/10 flex items-center space-x-3">
                {Icon && <div className="p-2 bg-white/20 rounded-lg text-primary"><Icon className="w-5 h-5" /></div>}
                {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            </div>
        )}
        <div className="p-6">
            {children}
        </div>
    </motion.div>
);

const AnimatedInput = ({ label, icon: Icon, ...props }) => (
    <div className="relative group">
        <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-primary">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <input
                {...props}
                className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 outline-none hover:bg-white/70 ${props.className || ''} disabled:bg-gray-100/50 disabled:text-gray-500`}
            />
        </div>
        {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
    </div>
);

export default function InvoiceCreate(props) {
    const { auth = {}, challan = {} } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useToastFlash();

    const { data, setData, post, processing, errors } = useForm({
        challan_id: challan?.id || '',
        price: 0,
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (challan?.id && data.challan_id !== challan.id) {
            setData('challan_id', challan.id);
        }
    }, [challan?.id]);

    const [calculations, setCalculations] = useState({
        baseAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        totalTax: 0,
        subtotal: 0,
        roundOff: 0,
        finalAmount: 0
    });

    useEffect(() => {
        const baseAmount = parseFloat(challan?.total_meter || 0) * parseFloat(data.price || 0);
        const cgstPercentage = parseFloat(challan?.quality?.cgst_percentage || 0);
        const sgstPercentage = parseFloat(challan?.quality?.sgst_percentage || 0);
        const igstPercentage = parseFloat(challan?.quality?.igst_percentage || 0);

        const cgstAmount = (baseAmount * cgstPercentage) / 100;
        const sgstAmount = (baseAmount * sgstPercentage) / 100;
        const igstAmount = (baseAmount * igstPercentage) / 100;

        const totalTax = cgstAmount + sgstAmount + igstAmount;
        const subtotal = baseAmount + totalTax;
        const finalAmount = Math.round(subtotal);
        const roundOff = finalAmount - subtotal;

        setCalculations({
            baseAmount: baseAmount.toFixed(2),
            cgstAmount: cgstAmount.toFixed(2),
            sgstAmount: sgstAmount.toFixed(2),
            igstAmount: igstAmount.toFixed(2),
            totalTax: totalTax.toFixed(2),
            subtotal: subtotal.toFixed(2),
            roundOff: roundOff.toFixed(2),
            finalAmount: finalAmount
        });
    }, [data.price, challan]);

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Invoices', href: route('invoices.index') },
        { label: 'Create Invoice' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    return (
        <>
            <Head title="Create Invoice" />

            <div className="flex h-screen bg-[#f0f2f5] overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-hide">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between mb-8"
                        >
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                                    Create Invoice
                                </h1>
                                <p className="text-gray-500 mt-1">Generate a new invoice for the selected challan</p>
                            </div>
                            <Button
                                variant="secondary"
                                onClick={() => router.visit(route('invoices.index'))}
                                className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/80 transition-all shadow-sm hover:shadow-md"
                            >
                                <MdArrowBack className="w-5 h-5" />
                                <span>Back</span>
                            </Button>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6 pb-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Details */}
                                <div className="lg:col-span-8 space-y-6">
                                    <GlassCard title="Challan Information" icon={MdReceipt} delay={0.1}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <AnimatedInput
                                                label="Challan Number"
                                                value={challan?.formatted_challan_number || ''}
                                                disabled
                                            />
                                            <AnimatedInput
                                                label="Linked Invoice No."
                                                value={challan?.challan_number ? `#INV-${String(challan.challan_number).padStart(6, '0')}` : ''}
                                                disabled
                                            />
                                            <AnimatedInput
                                                label="Quality Type"
                                                value={challan?.quality?.quality_name || ''}
                                                disabled
                                            />
                                            <AnimatedInput
                                                label="Total Meter"
                                                value={challan?.total_meter ? `${challan.total_meter} m` : ''}
                                                disabled
                                            />
                                        </div>
                                    </GlassCard>

                                    <GlassCard title="Party Details" icon={MdPerson} delay={0.2}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <AnimatedInput
                                                label="Party Name"
                                                value={challan?.party?.party_name || ''}
                                                disabled
                                            />
                                            <AnimatedInput
                                                label="GSTIN"
                                                value={challan?.party?.gst_number || 'N/A'}
                                                disabled
                                            />
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <textarea
                                                    value={challan?.party?.address || 'N/A'}
                                                    disabled
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl resize-none outline-none disabled:bg-gray-100/50 disabled:text-gray-500"
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                    </GlassCard>
                                    
                                     {/* Pricing Input Section */}
                                     <GlassCard title="Pricing Details" icon={MdAttachMoney} delay={0.3}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <AnimatedInput
                                                label="Price per Meter (₹)"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                error={errors.price}
                                                required
                                                icon={MdAttachMoney}
                                                className="font-semibold text-lg"
                                            />
                                            <AnimatedInput
                                                label="Invoice Date"
                                                type="date"
                                                value={data.date}
                                                onChange={(e) => setData('date', e.target.value)}
                                                error={errors.date}
                                                required
                                                icon={MdCalendarToday}
                                            />
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Right Column: Summary & Actions */}
                                <div className="lg:col-span-4 space-y-6">
                                    <GlassCard className="sticky top-6 bg-gradient-to-br from-white/60 to-white/40" delay={0.4}>
                                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                            <MdFactory className="mr-2 text-primary" /> Payment Summary
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">Base Amount</span>
                                                <span className="font-medium">₹{calculations.baseAmount}</span>
                                            </div>
                                            
                                            {/* Tax Breakdown */}
                                            <div className="py-4 border-t border-dashed border-gray-300 space-y-2">
                                                {challan?.quality?.cgst_percentage > 0 && (
                                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                                        <span>CGST ({challan.quality.cgst_percentage}%)</span>
                                                        <span>+ ₹{calculations.cgstAmount}</span>
                                                    </div>
                                                )}
                                                {challan?.quality?.sgst_percentage > 0 && (
                                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                                        <span>SGST ({challan.quality.sgst_percentage}%)</span>
                                                        <span>+ ₹{calculations.sgstAmount}</span>
                                                    </div>
                                                )}
                                                {challan?.quality?.igst_percentage > 0 && (
                                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                                        <span>IGST ({challan.quality.igst_percentage}%)</span>
                                                        <span>+ ₹{calculations.igstAmount}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                                                <span className="text-gray-600">Total Tax</span>
                                                <span className="font-semibold text-gray-800">₹{calculations.totalTax}</span>
                                            </div>
                                            
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-semibold">₹{calculations.subtotal}</span>
                                            </div>
                                            
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">Round Off</span>
                                                <span className="font-medium text-gray-500">
                                                    {calculations.roundOff > 0 ? '+' : ''}{calculations.roundOff}
                                                </span>
                                            </div>

                                            <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-primary font-bold">Total Payable</span>
                                                    <motion.span 
                                                        key={`total-${calculations.finalAmount}`}
                                                        initial={{ scale: 1.2, color: '#4F46E5' }}
                                                        animate={{ scale: 1, color: '#4338ca' }}
                                                        className="text-2xl font-bold"
                                                    >
                                                        ₹{calculations.finalAmount}
                                                    </motion.span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full mt-8 py-3 text-lg shadow-lg hover:shadow-primary/30 transition-shadow"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                {processing ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                ) : (
                                                    <MdSave className="w-6 h-6" />
                                                )}
                                                <span>{processing ? 'Processing...' : 'Create Invoice'}</span>
                                            </div>
                                        </Button>
                                    </GlassCard>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}