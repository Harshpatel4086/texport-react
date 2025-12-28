export default function Select({ 
    label, 
    value, 
    onChange, 
    children, 
    required = false, 
    error,
    className = "",
    ...props 
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-text mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-3 border border-neutral rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}