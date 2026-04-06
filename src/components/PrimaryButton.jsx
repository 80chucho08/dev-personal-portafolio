export const PrimaryButton = ({
    children,
    size = "md",
    className = "",
    variant = "primary",
    ...props
}) => {
    const sizeStyles = {
        sm: "px-4 py-2 text-xs font-medium",
        md: "px-6 py-3 text-sm font-semibold",
        lg: "px-8 py-4 text-base font-semibold",
    };

    const variantStyles = {
        primary:
            "bg-primary text-primary-foreground hover:bg-secondary shadow-lg shadow-primary/25 hover:shadow-lg hover:shadow-secondary/25",
        secondary:
            "bg-secondary text-secondary-foreground hover:bg-primary shadow-lg shadow-secondary/25 hover:shadow-lg hover:shadow-primary/25",
        outline:
            "border border-secondary/50 text-secondary hover:bg-secondary/10 bg-transparent",
        glass:
            "glass text-foreground hover:bg-surface/20 border border-white/10",
    };

    const baseStyles =
        "inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    // Si recibe href, renderiza como <a>, sino como <button>
    if (props.href) {
        return (
            <a className={finalClassName} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={finalClassName} {...props}>
            {children}
        </button>
    );
};
