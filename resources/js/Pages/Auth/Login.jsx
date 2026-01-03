import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Contexts/LanguageContext';
import LogoFull, { Logo3D, LogoIcon } from '@/Components/Logo';

export default function Login({ status, canResetPassword }) {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title={t('Login')} />
            
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
                {/* Left Side - Animated Gradient Background */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 animate-gradient items-center justify-center p-12 relative overflow-hidden">
                    
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                         <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
                         <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="text-center text-white relative z-10 animate-fade-in-up">
                        <div className="mb-8 flex justify-center animate-float">
                            <Logo3D className="w-32 h-32" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-md">
                            {t('Your Digital Textile Partner')}
                        </h2>
                        <p className="text-lg opacity-90 max-w-md mx-auto font-light leading-relaxed">
                            {t('Manage, track, and grow your global textile business with TexPortApp.')}
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/50">
                    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="text-center mb-10">
                            <Link
                                href={route("home")}
                                className="inline-block mb-6 hover:opacity-80 transition-opacity"
                            >
                                <LogoFull className="h-10" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {t('Welcome Back')}
                            </h1>
                            <p className="text-gray-500">
                                {t('Please enter your details to sign in')}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 text-sm text-green-700 bg-green-50 rounded-xl border border-green-100">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    {t('Email Address')}
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder={t('Enter your email')}
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
                                    {t('Password')}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200"
                                    placeholder={t('Enter your password')}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-500 ml-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData("remember", e.target.checked)}
                                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 transition-colors cursor-pointer"
                                        />
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {t('Remember me')}
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline transition-all"
                                    >
                                        {t('Forgot password?')}
                                    </Link>
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
                                        {t('Signing in...')}
                                    </span>
                                ) : t('Sign In')}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                            <p className="text-gray-500 text-sm">
                                {t('Don\'t have an account?')}{" "}
                                <Link
                                    href={route("register")}
                                    className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all"
                                >
                                    {t('Sign up for free')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
