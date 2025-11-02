import Tooltip from './Tooltip';

export default function Button({ 
    children, 
    tooltip,
    variant = "primary", 
    size = "md", 
    className = "", 
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-primary hover:bg-primary-600 text-white focus:ring-primary",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"
    };
    
    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    
    const button = (
        <button 
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
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