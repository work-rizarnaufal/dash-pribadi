import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    CheckSquare,
    Receipt,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    Settings,
    ChevronDown,
    ChevronRight,
    Activity,
    Menu,
    X,
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const { url } = usePage();

    // Group toggle states
    const [freelanceOpen, setFreelanceOpen] = useState(
        url.startsWith('/freelance') || url.startsWith('/clients') || url.startsWith('/tasks') || url.startsWith('/invoices')
    );
    const [budgetingOpen, setBudgetingOpen] = useState(
        url.startsWith('/budgeting') || url.startsWith('/income') || url.startsWith('/outcome')
    );

    const isActive = (path) => {
        if (path === '/dashboard') return url === '/dashboard' || url === '/';
        return url.startsWith(path);
    };

    const navItemClass = (active) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
            active
                ? 'bg-[#111827] text-white shadow-sm'
                : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
        }`;

    const subNavItemClass = (active) =>
        `flex items-center gap-2.5 px-3 py-1.5 pl-8 rounded-lg text-xs font-medium transition-colors ${
            active
                ? 'text-[#111827] font-semibold bg-[#F3F4F6]'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
        }`;

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#E5E7EB] flex flex-col transition-all duration-200 select-none
                ${collapsed ? 'w-16' : 'w-60'}
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            >
                {/* Brand / Logo */}
                <div className="h-16 flex items-center justify-between px-4.5 border-b border-[#F3F4F6]">
                    <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Activity className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-base text-[#111827] tracking-tight leading-none">
                                    Pulse CRM
                                </span>
                                <span className="text-[10px] text-[#9CA3AF] font-sans uppercase tracking-widest mt-0.5">
                                    Executive Suite
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden text-[#9CA3AF] hover:text-[#111827] p-1 rounded-md"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        className={navItemClass(isActive('/dashboard'))}
                        title={collapsed ? 'Beranda' : undefined}
                    >
                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>Beranda</span>}
                    </Link>

                    {/* Section: FREELANCE */}
                    <div>
                        {!collapsed ? (
                            <button
                                type="button"
                                onClick={() => setFreelanceOpen(!freelanceOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-4 h-4 shrink-0 text-[#6B7280]" />
                                    <span>Freelance</span>
                                </div>
                                {freelanceOpen ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                )}
                            </button>
                        ) : (
                            <Link
                                href="/clients"
                                className={navItemClass(url.startsWith('/clients') || url.startsWith('/tasks') || url.startsWith('/invoices'))}
                                title="Freelance"
                            >
                                <Briefcase className="w-4 h-4 shrink-0" />
                            </Link>
                        )}

                        {/* Freelance Submenu */}
                        {!collapsed && freelanceOpen && (
                            <div className="mt-1 space-y-0.5">
                                <Link
                                    href="/clients"
                                    className={subNavItemClass(isActive('/clients'))}
                                >
                                    <Users className="w-3.5 h-3.5 shrink-0" />
                                    <span>Klien</span>
                                </Link>
                                <Link
                                    href="/tasks"
                                    className={subNavItemClass(isActive('/tasks'))}
                                >
                                    <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                                    <span>Tugas & Kalender</span>
                                </Link>
                                <Link
                                    href="/invoices"
                                    className={subNavItemClass(isActive('/invoices'))}
                                >
                                    <Receipt className="w-3.5 h-3.5 shrink-0" />
                                    <span>Invoicing</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Section: BUDGETING */}
                    <div>
                        {!collapsed ? (
                            <button
                                type="button"
                                onClick={() => setBudgetingOpen(!budgetingOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-4 h-4 shrink-0 text-[#6B7280]" />
                                    <span>Budgeting</span>
                                </div>
                                {budgetingOpen ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                )}
                            </button>
                        ) : (
                            <Link
                                href="/budgeting/income"
                                className={navItemClass(url.startsWith('/budgeting'))}
                                title="Budgeting"
                            >
                                <Wallet className="w-4 h-4 shrink-0" />
                            </Link>
                        )}

                        {/* Budgeting Submenu */}
                        {!collapsed && budgetingOpen && (
                            <div className="mt-1 space-y-0.5">
                                <Link
                                    href="/budgeting/income"
                                    className={subNavItemClass(isActive('/budgeting/income'))}
                                >
                                    <ArrowDownLeft className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                                    <span>Pemasukan</span>
                                </Link>
                                <Link
                                    href="/budgeting/outcome"
                                    className={subNavItemClass(isActive('/budgeting/outcome'))}
                                >
                                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                                    <span>Pengeluaran</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / Settings Section */}
                <div className="p-3 border-t border-[#F3F4F6] space-y-1">
                    <Link
                        href="/settings"
                        className={navItemClass(isActive('/settings'))}
                        title={collapsed ? 'Pengaturan' : undefined}
                    >
                        <Settings className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>Pengaturan</span>}
                    </Link>
                </div>
            </aside>
        </>
    );
}

