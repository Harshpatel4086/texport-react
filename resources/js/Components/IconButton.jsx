import Tooltip from './Tooltip';

export default function IconButton({ 
    icon: Icon, 
    tooltip, 
    variant = "primary", 
    size = "md", 
    onClick,
    className = "",
    ...props 
}) {
    const variants = {
        primary: "text-primary hover:text-primary-600",
        danger: "text-red-500 hover:text-red-700",
        secondary: "text-gray-500 hover:text-gray-700"
    };

    const sizes = {
        sm: "p-1 w-6 h-6",
        md: "p-1 w-8 h-8",
        lg: "p-2 w-10 h-10"
    };

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4", 
        lg: "w-5 h-5"
    };

    const button = (
        <button
            onClick={onClick}
            className={`${variants[variant]} ${sizes[size]} transition-colors rounded hover:bg-gray-100 ${className}`}
            {...props}
        >
            <Icon className={iconSizes[size]} />
        </button>
    );

    return tooltip ? (
        <Tooltip text={tooltip}>
            {button}
        </Tooltip>
    ) : button;
}