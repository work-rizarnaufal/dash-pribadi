import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Layouts/Sidebar';
import Topbar from '@/Components/Layouts/Topbar';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function AppLayout({ title, subtitle, actions, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { flash = {} } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col font-sans antialiased selection:bg-[#111827] selection:text-white">
            <Head title={title ? `${title} - Pulse CRM` : 'Pulse CRM'} />

            {/* Persistent Sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Application Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-200 ${
                    collapsed ? 'lg:pl-16' : 'lg:pl-60'
                }`}
            >
                {/* Topbar */}
                <Topbar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setMobileOpen={setMobileOpen}
                />

                {/* Flash Message Toast Notification */}
                {showFlash && flash?.success && (
                    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs shadow-xs">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                                <span className="font-medium">{flash.success}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowFlash(false)}
                                className="text-[#059669] hover:text-[#065F46]"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}

                {showFlash && flash?.error && (
                    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs shadow-xs">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                                <span className="font-medium">{flash.error}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowFlash(false)}
                                className="text-[#DC2626] hover:text-[#991B1B]"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Content Container */}
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Header Banner */}
                    {(title || actions) && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2 border-b border-[#E5E7EB]/60">
                            <div className="space-y-1">
                                {title && (
                                    <h1 className="text-xl sm:text-2xl font-bold font-display text-[#111827] tracking-tight">
                                        {title}
                                    </h1>
                                )}
                                {subtitle && (
                                    <p className="text-xs sm:text-sm text-[#6B7280]">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            {actions && (
                                <div className="flex items-center gap-2.5 shrink-0">
                                    {actions}
                                </div>
                            )}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}

