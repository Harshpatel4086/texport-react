import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Toast from '@/Components/Toast';
import { Logo3D } from '@/Components/Logo';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        const checkVerification = () => {
            fetch('/email/verification-status', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(data => {
                if (data.verified) {
                    router.visit('/dashboard');
                }
            })
            .catch(() => {});
        };

        const interval = setInterval(checkVerification, 3000);
        return () => clearInterval(interval);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Verification email sent successfully!');
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0] || 'Failed to send verification email';
                toast.error(errorMessage);
            }
        });
    };

    return (
        <>
            <Head title="Email Verification" />

             {/* Custom Animations */}
             <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 20px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-gradient { 
                    background-size: 200% 200%;
                    animation: gradient-x 15s ease infinite; 
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 animate-gradient flex items-center justify-center p-6 relative overflow-hidden">
                
                {/* Abstract Shapes */}
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
                     <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-md w-full bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl animate-fade-in-up relative z-10 text-center">
                    
                    <div className="mb-8 flex justify-center">
                        <Link href={route("home")} className="hover:scale-105 transition-transform duration-300">
                             <Logo3D className="w-24 h-24" />
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Verify Your Email
                    </h1>
                    
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 border border-blue-100">
                        Thanks for signing up! Before getting started, please verify your email address by clicking on the link we just emailed to you.
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : "Resend Verification Email"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                         <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-gray-500 hover:text-red-600 font-medium transition-colors text-sm"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
            <Toast />
        </>
    );
}
