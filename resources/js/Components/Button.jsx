import Tooltip from './Tooltip';

export default function Button({ 
    children, 
    tooltip,
    variant = "primary", 
    size = "md", 
    className = "", 
    disabled = false,
    processing = false,
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-primary hover:bg-primary-600 text-white focus:ring-primary-500 shadow-md hover:shadow-lg",
        secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-gray-500 shadow-sm hover:shadow-md",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
        success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-md hover:shadow-lg",
        outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:ring-primary-500 bg-transparent hover:bg-primary/5",
        "outline-success": "border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-500",
        "outline-danger": "border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-500"
    };
    
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };
    
    const button = (
        <button 
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || processing}
            {...props}
        >
            {children}
        </button>
    );

    return tooltip ? (
        <Tooltip text={tooltip}>
            {button}
        </Tooltip>
    ) : button;
}