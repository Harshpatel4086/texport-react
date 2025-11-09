import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Toast from '@/Components/Toast';

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

            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
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
                        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-text mb-4">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Thanks for signing up! Before getting started,
                            please verify your email address by clicking on the
                            link we just emailed to you.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {processing
                                ? "Sending..."
                                : "Resend Verification Email"}
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-red-600 hover:text-red-500 font-medium"
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
