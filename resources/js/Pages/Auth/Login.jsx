import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
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
            <Head title="Login" />

            <div className="min-h-screen bg-background flex">
                {/* Left Side - Gradient Background */}
                <div className="hidden lg:flex lg:w-1/2 bg-brand-gradient items-center justify-center p-12">
                    <div className="text-center text-white">
                        {/* <img
                            src="/assets/default_image.png"
                            alt="TexPort"
                            className="w-64 h-64 object-contain mx-auto mb-8"
                        /> */}
                        <h2 className="text-3xl font-bold mb-4">
                            Your Digital Textile Partner
                        </h2>
                        <p className="text-lg opacity-90">
                            Manage, track, and grow your global textile business
                            with TexPortApp.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <div className="text-center mb-8">
                            <Link
                                href={route("home")}
                                className="text-3xl font-bold text-primary mb-6 block"
                            >
                                <img
                                    src="/assets/logo/logo_dark.png"
                                    alt="TexPort"
                                    className="w-64 h-20 object-contain mx-auto"
                                />
                            </Link>
                            <h1 className="text-2xl font-bold text-text mb-2">
                                Sign In
                            </h1>
                            <p className="text-gray-600">
                                Welcome back! Please enter your details
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm text-secondary bg-secondary/10 p-3 rounded-lg">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-neutral rounded-lg text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-neutral rounded-lg text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="w-4 h-4 text-primary bg-white border-neutral rounded focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-text">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-primary hover:text-primary-600 font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {processing ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-primary hover:text-primary-600 font-medium"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
