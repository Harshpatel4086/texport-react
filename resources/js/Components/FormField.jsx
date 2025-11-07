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
    const dateInputClasses = "w-full px-4 py-3 border border-neutral rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100";

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClasses} ${className} ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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

        if (type === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`${baseInputClasses} ${className}`}
                    style={{ minHeight: "100px" }}
                    rows={3}
                    {...props}
                />
            );
        }

        if (type === 'checkbox-group') {
            return (
                <div className="space-y-2">
                    {options.map((option) => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={Array.isArray(value) && value.includes(option.value)}
                                onChange={(e) => {
                                    const currentValue = Array.isArray(value) ? value : [];
                                    const newValue = e.target.checked
                                        ? [...currentValue, option.value]
                                        : currentValue.filter(v => v !== option.value);
                                    onChange({ target: { value: newValue } });
                                }}
                                className="mr-2"
                            />
                            <span className="text-sm text-text">{option.label}</span>
                        </label>
                    ))}
                </div>
            );
        }

        return (
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${type === 'date' ? dateInputClasses : baseInputClasses} ${className}`}
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
