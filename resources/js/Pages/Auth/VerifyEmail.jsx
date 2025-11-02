import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />
            
            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
                        <Link href={route('home')} className="text-3xl font-bold text-primary mb-6 block">
                            TexPort
                        </Link>
                        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-text mb-4">Verify Your Email</h1>
                        <p className="text-gray-600 mb-6">
                            Thanks for signing up! Before getting started, please verify your email address by clicking on the link we just emailed to you.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 text-sm text-secondary bg-secondary/10 p-3 rounded-lg">
                            A new verification link has been sent to your email address.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Sending...' : 'Resend Verification Email'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-gray-600 hover:text-text font-medium"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}