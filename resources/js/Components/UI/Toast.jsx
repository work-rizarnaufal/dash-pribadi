import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const TOAST_ICONS = {
    success: {
        icon: CheckCircle2,
        color: 'text-[#10B981]',
        badgeBg: 'bg-[#ECFDF5]',
    },
    error: {
        icon: AlertCircle,
        color: 'text-[#EF4444]',
        badgeBg: 'bg-[#FEF2F2]',
    },
    warning: {
        icon: AlertTriangle,
        color: 'text-[#F59E0B]',
        badgeBg: 'bg-[#FFFBEB]',
    },
    info: {
        icon: Info,
        color: 'text-[#111827]',
        badgeBg: 'bg-[#F3F4F6]',
    },
};

export function ToastItem({ toast, onDismiss }) {
    const config = TOAST_ICONS[toast.type] || TOAST_ICONS.info;
    const Icon = config.icon;

    return (
        <div
            role="status"
            aria-live="polite"
            className="animate-toast pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] min-w-[280px] max-w-sm w-full select-none"
        >
            <div className={`w-7 h-7 rounded-lg ${config.badgeBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
                {toast.title && (
                    <p className="text-xs font-semibold text-[#111827] leading-tight mb-0.5">
                        {toast.title}
                    </p>
                )}
                <p className="text-xs text-[#4B5563] leading-relaxed break-words">
                    {toast.message}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="text-[#9CA3AF] hover:text-[#111827] p-1 -mr-1 -mt-0.5 rounded-md hover:bg-[#F3F4F6] transition-colors shrink-0"
                aria-label="Tutup notifikasi"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

export default function ToastContainer({ toasts = [], onDismiss }) {
    if (!toasts || toasts.length === 0) return null;

    return (
        <div
            aria-label="Notifikasi"
            className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

