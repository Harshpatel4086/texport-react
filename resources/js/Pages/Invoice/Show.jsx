import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import { MdArrowBack, MdPrint, MdBusiness, MdPerson, MdReceipt, MdDescription, MdDateRange, MdGridOn } from 'react-icons/md';
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

const DetailRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <div className="flex items-center text-gray-600">
            {Icon && <Icon className="w-4 h-4 mr-2 text-primary/70" />}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="font-semibold text-gray-800 text-right">{value || 'N/A'}</span>
    </div>
);

const SummaryRow = ({ label, value, isTotal = false, isSub = false }) => (
    <div className={`flex justify-between items-center ${isTotal ? 'pt-4 border-t border-gray-200 mt-2' : 'py-1'} ${isSub ? 'text-sm text-gray-500' : ''}`}>
        <span className={`${isTotal ? 'text-lg font-bold text-gray-800' : 'text-gray-600'}`}>{label}</span>
        <span className={`${isTotal ? 'text-2xl font-bold text-primary' : 'font-medium text-gray-800'}`}>{value}</span>
    </div>
);

export default function InvoiceShow(props) {
    const { auth = {}, invoice = {}, businessDetails = {} } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useToastFlash();    

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Invoices', href: route('invoices.index') },
        { label: `Invoice ${invoice.formatted_invoice_number}` }
    ];

    const handlePrint = () => {
        const publicUrl = route('invoices.public', invoice.encrypted_id);
        window.open(publicUrl, '_blank');
    };

    return (
        <>
            <Head title={`Invoice ${invoice.formatted_invoice_number}`} />

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
                            className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/50">
                                    <MdDescription className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Invoice {invoice.formatted_invoice_number}
                                    </h1>
                                    <p className="text-gray-500 mt-1 flex items-center">
                                        <MdDateRange className="w-4 h-4 mr-1" />
                                        {new Date(invoice.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                {/* <Button
                                    variant="primary"
                                    onClick={handlePrint}
                                    className="flex items-center space-x-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all"
                                >
                                    <MdPrint className="w-5 h-5" />
                                    <span>Print Invoice</span>
                                </Button> */}
                                <Button
                                    variant="secondary"
                                    onClick={() => router.visit(route('invoices.index'))}
                                    className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/80 transition-all shadow-sm hover:shadow-md"
                                >
                                    <MdArrowBack className="w-5 h-5" />
                                    <span>Back</span>
                                </Button>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-10">
                             {/* Left Column: Details */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Business Details */}
                                    <GlassCard title="Billed From" icon={MdBusiness} delay={0.1}>
                                        <div className="space-y-4">
                                            <div className="font-bold text-lg text-gray-800">{businessDetails.name || 'N/A'}</div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p>{businessDetails.address || 'N/A'}</p>
                                                <p><span className="font-medium">GSTIN:</span> {businessDetails.gst || 'N/A'}</p>
                                                <p><span className="font-medium">Phone:</span> {businessDetails.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    {/* Party Details */}
                                    <GlassCard title="Billed To" icon={MdPerson} delay={0.2}>
                                        <div className="space-y-4">
                                            <div className="font-bold text-lg text-gray-800">{invoice.party?.party_name}</div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                 <p>{invoice.party?.address || 'N/A'}</p>
                                                <p><span className="font-medium">GSTIN:</span> {invoice.party?.gst_number || 'N/A'}</p>
                                                <p><span className="font-medium">Phone:</span> {invoice.party?.phone_number || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Invoice Specifics */}
                                <GlassCard title="Invoice Item Details" icon={MdReceipt} delay={0.3}>
                                    <div className="space-y-2">
                                        <DetailRow label="Challan Number" value={invoice.challan?.formatted_challan_number} icon={MdDescription}  />
                                        <DetailRow label="Quality" value={invoice.quality?.quality_name} icon={MdGridOn} />
                                        <DetailRow label="Total Meter" value={`${invoice.total_meter} m`} />
                                        <DetailRow label="Price per Meter" value={`₹${parseFloat(invoice.price).toFixed(2)}`} />
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Right Column: Financial Summary */}
                            <div className="lg:col-span-1 space-y-6">
                                <GlassCard className="sticky top-6 bg-gradient-to-br from-white/60 to-white/40 border-primary/20" delay={0.4}>
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                       Payment Summary
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <SummaryRow label="Base Amount" value={`₹${parseFloat(invoice.base_amount).toFixed(2)}`} />
                                        
                                        <div className="py-4 border-t border-dashed border-gray-300 space-y-2">
                                            {invoice.cgst_percentage > 0 && (
                                                <SummaryRow label={`CGST (${invoice.cgst_percentage}%)`} value={`+ ₹${parseFloat(invoice.cgst_amount).toFixed(2)}`} isSub />
                                            )}
                                            {invoice.sgst_percentage > 0 && (
                                                <SummaryRow label={`SGST (${invoice.sgst_percentage}%)`} value={`+ ₹${parseFloat(invoice.sgst_amount).toFixed(2)}`} isSub />
                                            )}
                                            {invoice.igst_percentage > 0 && (
                                                <SummaryRow label={`IGST (${invoice.igst_percentage}%)`} value={`+ ₹${parseFloat(invoice.igst_amount).toFixed(2)}`} isSub />
                                            )}
                                            <div className="flex justify-between items-center text-sm pt-2">
                                                <span className="text-gray-600 font-medium">Total Tax</span>
                                                <span className="font-semibold text-gray-800">₹{parseFloat(invoice.total_tax).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <SummaryRow label="Subtotal" value={`₹${parseFloat(invoice.subtotal).toFixed(2)}`} />
                                        <SummaryRow label="Round Off" value={`₹${parseFloat(invoice.round_off).toFixed(2)}`} isSub />
                                        
                                        <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
                                            <SummaryRow label="Grand Total" value={`₹${parseFloat(invoice.final_amount).toLocaleString()}`} isTotal />
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}