import React from 'react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onClick,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none";

    const sizeStyles = {
        sm: "h-8 px-2.5 text-xs rounded-md gap-1.5",
        md: "h-9 px-3.5 text-sm rounded-lg gap-2",
        lg: "h-10 px-4 text-sm rounded-lg gap-2",
        icon: "h-9 w-9 p-0 rounded-lg justify-center",
        "icon-sm": "h-8 w-8 p-0 rounded-md justify-center",
    };

    const variantStyles = {
        primary: "bg-[#111827] text-white hover:bg-[#1F2937] active:bg-[#030712] focus:ring-slate-900 shadow-sm",
        secondary: "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] active:bg-[#F3F4F6] focus:ring-slate-400 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]",
        outline: "bg-transparent text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] focus:ring-slate-400",
        ghost: "bg-transparent text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] focus:ring-slate-300",
        danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] focus:ring-red-500 shadow-sm",
        "danger-outline": "bg-white text-[#EF4444] border border-[#FCA5A5] hover:bg-[#FEF2F2] focus:ring-red-300",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : LeftIcon ? (
                <LeftIcon className="w-4 h-4 shrink-0" />
            ) : null}
            <span>{children}</span>
            {!loading && RightIcon && (
                <RightIcon className="w-4 h-4 shrink-0" />
            )}
        </button>
    );
}

