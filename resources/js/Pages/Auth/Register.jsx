import { Head, Link, useForm } from '@inertiajs/react';
import Input from '@/Components/Input'; // Assuming Input component exists, but we might want to style it directly or wrap it
import { Logo3D, LogoFull } from '@/Components/Logo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

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

            <div className="min-h-screen bg-gray-50 flex">
                {/* Left Side - Register Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/50">
                    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 animate-fade-in-up">
                        <div className="text-center mb-8">
                            <Link
                                href={route("home")}
                                className="inline-block mb-6 hover:opacity-80 transition-opacity"
                            >
                                <LogoFull className="h-10" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-500">
                                Join us today! Please fill in your details
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-red-500 ml-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-500 ml-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder="Create a password"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-500 ml-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder="Confirm your password"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-sm text-red-500 ml-1">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{" "}
                                <Link
                                    href={route("login")}
                                    className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Animated Gradient Background */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-secondary-500 via-primary-500 to-primary-600 animate-gradient items-center justify-center p-12 relative overflow-hidden">
                    
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                         <div className="absolute bottom-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                         <div className="absolute top-20 right-20 w-80 h-80 bg-primary-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                    </div>

                    <div className="text-center text-white relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="mb-8 flex justify-center animate-float">
                             <Logo3D className="w-32 h-32" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-md">
                            Join TexPort Today
                        </h2>
                        <p className="text-lg opacity-90 max-w-md mx-auto font-light leading-relaxed">
                            Start your journey with our modern platform and streamline your exports.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
