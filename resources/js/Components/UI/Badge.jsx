import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function Badge({
    children,
    variant = 'neutral',
    trend, // 'up', 'down', 'neutral'
    size = 'sm',
    dot = false,
    className = '',
    ...props
}) {
    const sizeStyles = {
        xs: "text-[10px] px-2 py-0.5 font-semibold",
        sm: "text-[11px] px-2.5 py-0.5 font-medium",
        md: "text-xs px-3 py-1 font-medium",
    };

    const variantStyles = {
        // Semantic trends & outcomes
        growth: "bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]/40",
        positive: "bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]/40",
        negative: "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]/40",
        danger: "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]/40",
        neutral: "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]",
        dark: "bg-[#111827] text-white",
        warning: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/50",
        info: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/50",

        // Domain specific: Invoices
        paid: "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/50",
        sent: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/50",
        draft: "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]",
        overdue: "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/50",

        // Domain specific: Clients
        lead: "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]",
        active: "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/50",
        inactive: "bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB]",

        // Domain specific: Tasks
        todo: "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]",
        in_progress: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/50",
        review: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/50",
        done: "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/50",

        // Priority
        low: "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]",
        medium: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/50",
        high: "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/50",
    };

    const currentVariant = variantStyles[variant.toLowerCase()] || variantStyles.neutral;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full whitespace-nowrap tracking-tight transition-colors ${sizeStyles[size] || sizeStyles.sm} ${currentVariant} ${className}`}
            {...props}
        >
            {dot && (
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />
            )}

            {trend === 'up' && (
                <ArrowUpRight className="w-3 h-3 shrink-0 stroke-[2.5]" />
            )}
            {trend === 'down' && (
                <ArrowDownRight className="w-3 h-3 shrink-0 stroke-[2.5]" />
            )}
            {trend === 'neutral' && (
                <Minus className="w-3 h-3 shrink-0 stroke-[2.5]" />
            )}

            <span>{children}</span>
        </span>
    );
}

