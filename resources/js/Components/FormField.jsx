export default function FormField({ 
    type = "text", 
    label, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error,
    options = [], // For select fields
    className = "",
    ...props 
}) {
    const baseInputClasses = "w-full px-4 py-3 border border-neutral rounded-lg text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClasses} ${className}`}
                    required={required}
                    {...props}
                >
                    <option value="">{placeholder || `Select ${label}`}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${baseInputClasses} ${className}`}
                {...props}
            />
        );
    };

    return (
        <div>
            <label className="block text-sm font-medium text-text mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {renderInput()}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}