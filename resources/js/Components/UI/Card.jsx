import React from 'react';

export default function Card({
    children,
    title,
    subtitle,
    action,
    className = '',
    headerClassName = '',
    bodyClassName = '',
    footer,
    footerClassName = '',
    as: Component = 'div',
    noPadding = false,
    ...props
}) {
    return (
        <Component
            className={`bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-150 ${className}`}
            {...props}
        >
            {(title || action || subtitle) && (
                <div
                    className={`flex items-start justify-between gap-4 px-6 py-4.5 border-b border-[#F3F4F6] ${headerClassName}`}
                >
                    <div className="space-y-0.5">
                        {title && (
                            <h3 className="text-base font-semibold text-[#111827] font-display tracking-tight">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-xs text-[#6B7280] font-sans">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {action && (
                        <div className="flex items-center gap-2 shrink-0">
                            {action}
                        </div>
                    )}
                </div>
            )}

            <div className={`${noPadding ? '' : 'p-6'} ${bodyClassName}`}>
                {children}
            </div>

            {footer && (
                <div
                    className={`px-6 py-3.5 bg-[#F9FAFB] border-t border-[#F3F4F6] text-xs text-[#6B7280] flex items-center justify-between ${footerClassName}`}
                >
                    {footer}
                </div>
            )}
        </Component>
    );
}

