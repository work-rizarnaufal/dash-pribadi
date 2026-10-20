import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

export default function Modal({
    isOpen = false,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = 'max-w-lg',
    className = '',
}) {
    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Escape' && isOpen && onClose) {
                onClose();
            }
        },
        [isOpen, onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-[#111827]/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Dialog Container */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
                <div
                    className={`relative w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all duration-200 ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {(title || onClose) && (
                        <div className="flex items-start justify-between border-b border-[#F3F4F6] px-6 py-4.5">
                            <div className="space-y-0.5">
                                {title && (
                                    <h3 className="text-base font-semibold text-[#111827] font-display">
                                        {title}
                                    </h3>
                                )}
                                {subtitle && (
                                    <p className="text-xs text-[#6B7280]">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            {onClose && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors focus:outline-none"
                                >
                                    <X className="w-4 h-4" />
                                    <span className="sr-only">Tutup</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="px-6 py-5 text-sm text-[#4B5563]">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="flex items-center justify-end gap-2.5 border-t border-[#F3F4F6] bg-[#F9FAFB] px-6 py-3.5">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

