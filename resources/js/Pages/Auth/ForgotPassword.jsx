import { Head, Link, useForm } from '@inertiajs/react';
import { Logo3D, LogoFull } from '@/Components/Logo';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

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
                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
                     <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-md w-full bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl animate-fade-in-up relative z-10">
                    <div className="text-center mb-8">
                        <Link
                            href={route("home")}
                            className="inline-block mb-6 hover:scale-105 transition-transform duration-300"
                        >
                            <Logo3D className="w-20 h-20" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            No problem. Just let us know your email address and
                            we will email you a password reset link.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 text-sm text-green-700 bg-green-50 rounded-xl border border-green-100 animate-fade-in-up">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                placeholder="Enter your email address"
                                required
                            />
                             {errors.email && (
                                <p className="mt-1.5 text-sm text-red-500 ml-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

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
                                    Sending Link...
                                </span>
                            ) : "Email Password Reset Link"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <Link
                            href={route("login")}
                            className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
