import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Layouts/Sidebar';
import Topbar from '@/Components/Layouts/Topbar';
import { useToast } from '@/Context/ToastContext';

export default function AppLayout({ title, subtitle, actions, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { flash = {} } = usePage().props;
    const { toast } = useToast();

    // Automatically trigger floating toast when Inertia flash message arrives
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash?.success, flash?.error]);

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

                {/* Content Container */}
                <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
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

