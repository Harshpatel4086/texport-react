import { Head, Link, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        business_name: '',
        owner_name: '',
        email: '',
        phone: '',
        gst_number: '',
        business_location: '',
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

            <div className="min-h-screen bg-background flex">
                {/* Left Side - Register Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <div className="text-center mb-8">
                            <Link href={route('home')} className="text-3xl font-bold text-primary mb-6 block">
                                TexPort
                            </Link>
                            <h1 className="text-2xl font-bold text-text mb-2">Create Account</h1>
                            <p className="text-gray-600">Join us today! Please fill in your details</p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <Input
                                label="Business Name"
                                value={data.business_name}
                                onChange={(e) => setData('business_name', e.target.value)}
                                placeholder="Enter your business name"
                                required
                                error={errors.business_name}
                            />

                            <Input
                                label="Owner Name"
                                value={data.owner_name}
                                onChange={(e) => setData('owner_name', e.target.value)}
                                placeholder="Enter owner name"
                                required
                                error={errors.owner_name}
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                                required
                                error={errors.email}
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Enter your phone number"
                                required
                                error={errors.phone}
                            />

                            <Input
                                label="GST Number"
                                value={data.gst_number}
                                onChange={(e) => setData('gst_number', e.target.value)}
                                placeholder="Enter GST number (optional)"
                                error={errors.gst_number}
                            />

                            <Input
                                label="Business Location"
                                value={data.business_location}
                                onChange={(e) => setData('business_location', e.target.value)}
                                placeholder="Enter your business location"
                                required
                                error={errors.business_location}
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Create a password"
                                required
                                error={errors.password}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm your password"
                                required
                                error={errors.password_confirmation}
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-primary hover:text-primary-600 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Gradient Background */}
                <div className="hidden lg:flex lg:w-1/2 bg-brand-gradient items-center justify-center p-12">
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Join TexPort Today</h2>
                        <p className="text-lg opacity-90">Start your journey with our modern platform</p>
                    </div>
                </div>
            </div>
        </>
    );
}
