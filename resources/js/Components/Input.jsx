export default function Input({ 
    label, 
    type = "text", 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error,
    className = "",
    ...props 
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-text mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-3 border border-neutral rounded-lg text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}