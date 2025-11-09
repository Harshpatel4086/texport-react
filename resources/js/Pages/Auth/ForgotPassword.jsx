import { Head, Link, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';

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

            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        {/* <Link href={route('home')} className="text-3xl font-bold text-primary mb-6 block">
                            TexPort
                        </Link> */}
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
                            Forgot Password?
                        </h1>
                        <p className="text-gray-600">
                            No problem. Just let us know your email address and
                            we will email you a password reset link.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm text-secondary bg-secondary/10 p-3 rounded-lg text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Enter your email address"
                            required
                            error={errors.email}
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {processing
                                ? "Sending..."
                                : "Email Password Reset Link"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href={route("login")}
                            className="text-primary hover:text-primary-600 font-medium"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
