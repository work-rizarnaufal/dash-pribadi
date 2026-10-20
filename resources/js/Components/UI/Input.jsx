import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
    {
        label,
        type = 'text',
        error,
        helperText,
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
        className = '',
        containerClassName = '',
        id,
        required = false,
        ...props
    },
    ref
) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans"
                >
                    {label}
                    {required && <span className="text-[#EF4444] ml-0.5">*</span>}
                </label>
            )}

            <div className="relative rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
                {LeftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <LeftIcon className="w-4 h-4" />
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    required={required}
                    className={`block w-full rounded-lg border text-sm text-[#111827] placeholder-[#9CA3AF] bg-[#FFFFFF] transition-colors duration-150
                        ${LeftIcon ? 'pl-9' : 'pl-3.5'}
                        ${RightIcon ? 'pr-9' : 'pr-3.5'}
                        py-2
                        ${
                            error
                                ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]'
                                : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]'
                        }
                        disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
                        focus:outline-none ${className}`}
                    {...props}
                />

                {RightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <RightIcon className="w-4 h-4" />
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1 font-medium">
                    <span>{error}</span>
                </p>
            )}

            {!error && helperText && (
                <p className="mt-1 text-xs text-[#6B7280]">{helperText}</p>
            )}
        </div>
    );
});

export default Input;

