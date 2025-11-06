import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import { Link, useForm, usePage } from '@inertiajs/react';
import { MdPerson, MdEmail } from 'react-icons/md';
import { toaster } from '@/Utils/toaster';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => {
                toaster.success('Profile updated successfully!');
            },
            onError: () => {
                toaster.error('Failed to update profile. Please try again.');
            }
        });
    };

    return (
        <section className={className}>
            <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <MdPerson className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text">
                        Profile Information
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Update your account's profile information and email address.
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required
                        icon={MdPerson}
                        placeholder="Enter your full name"
                        autoComplete="name"
                    />

                    <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                        icon={MdEmail}
                        placeholder="Enter your email address"
                        autoComplete="username"
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Email verification required
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="font-medium underline hover:text-yellow-600"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>
                                </div>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-700">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        loading={processing}
                        className="px-6"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </section>
    );
}
