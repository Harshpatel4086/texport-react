import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import { useForm } from '@inertiajs/react';
import { MdLock, MdSecurity } from 'react-icons/md';
import { toaster } from '@/Utils/toaster';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toaster.success('Password updated successfully!');
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
                toaster.error('Failed to update password. Please check your inputs.');
            },
        });
    };

    return (
        <section className={className}>
            <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                    <MdSecurity className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text">
                        Security Settings
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </div>
            </div>

            <form onSubmit={updatePassword} className="space-y-6">
                <FormField
                    label="Current Password"
                    name="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    error={errors.current_password}
                    required
                    icon={MdLock}
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    ref={currentPasswordInput}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="New Password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                        icon={MdLock}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        ref={passwordInput}
                    />

                    <FormField
                        label="Confirm New Password"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={errors.password_confirmation}
                        required
                        icon={MdLock}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                    />
                </div>

                {/* Security Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <MdSecurity className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Password Security Tips
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Use at least 8 characters with a mix of letters, numbers, and symbols</li>
                                    <li>Avoid using personal information or common words</li>
                                    <li>Consider using a password manager for stronger security</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        loading={processing}
                        className="px-6"
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </section>
    );
}
