import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    FolderKanban,
    CheckSquare,
    Receipt,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    Settings,
    ChevronDown,
    ChevronRight,
    Activity,
    X,
} from 'lucide-react';

const NAV_GROUPS = [
    {
        id: 'freelance',
        label: 'Freelance',
        icon: Briefcase,
        basePaths: ['/clients', '/projects', '/tasks', '/invoices', '/freelance'],
        defaultHref: '/clients',
        items: [
            { label: 'Klien', href: '/clients', icon: Users },
            { label: 'Proyek & Maintenance', href: '/projects', icon: FolderKanban },
            { label: 'Tugas & Kalender', href: '/tasks', icon: CheckSquare },
            { label: 'Invoicing', href: '/invoices', icon: Receipt },
        ],
    },
    {
        id: 'budgeting',
        label: 'Budgeting',
        icon: Wallet,
        basePaths: ['/budgeting', '/income', '/outcome'],
        defaultHref: '/budgeting/income',
        items: [
            { label: 'Pemasukan', href: '/budgeting/income', icon: ArrowDownLeft, iconColor: 'text-emerald-600' },
            { label: 'Pengeluaran', href: '/budgeting/outcome', icon: ArrowUpRight, iconColor: 'text-rose-500' },
        ],
    },
];

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
    const { url } = usePage();

    const isGroupActive = (group) => group.basePaths.some((path) => url.startsWith(path));
    const isLinkActive = (path) => (path === '/dashboard' ? url === '/dashboard' || url === '/' : url.startsWith(path));

    const [openGroups, setOpenGroups] = useState({
        freelance: isGroupActive(NAV_GROUPS[0]),
        budgeting: isGroupActive(NAV_GROUPS[1]),
    });

    const toggleGroup = (id) => {
        setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleNavClick = () => {
        if (mobileOpen) setMobileOpen(false);
    };

    const navItemClass = (active) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
            active
                ? 'bg-[#111827] text-white shadow-xs'
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
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#E5E7EB] flex flex-col transition-all duration-200 select-none ${
                    collapsed ? 'w-16' : 'w-60'
                } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Brand / Logo */}
                <div className="h-16 flex items-center justify-between px-4.5 border-b border-[#F3F4F6]">
                    <Link
                        href="/dashboard"
                        onClick={handleNavClick}
                        className="flex items-center gap-2.5 overflow-hidden"
                    >
                        <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white shrink-0 shadow-xs">
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
                        aria-label="Tutup navigasi"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        onClick={handleNavClick}
                        className={navItemClass(isLinkActive('/dashboard'))}
                        title={collapsed ? 'Beranda' : undefined}
                    >
                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>Beranda</span>}
                    </Link>

                    {/* Accordion Groups (Freelance & Budgeting) */}
                    {NAV_GROUPS.map((group) => {
                        const Icon = group.icon;
                        const groupActive = isGroupActive(group);
                        const isOpen = openGroups[group.id];

                        if (collapsed) {
                            return (
                                <Link
                                    key={group.id}
                                    href={group.defaultHref}
                                    onClick={handleNavClick}
                                    className={navItemClass(groupActive)}
                                    title={group.label}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                </Link>
                            );
                        }

                        return (
                            <div key={group.id} className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(group.id)}
                                    aria-expanded={isOpen}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        groupActive && !isOpen
                                            ? 'text-[#111827] bg-[#F3F4F6] font-semibold'
                                            : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4 shrink-0 text-[#6B7280]" />
                                        <span>{group.label}</span>
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                    ) : (
                                        <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="space-y-0.5">
                                        {group.items.map((sub) => {
                                            const SubIcon = sub.icon;
                                            const subActive = isLinkActive(sub.href);
                                            return (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={handleNavClick}
                                                    className={subNavItemClass(subActive)}
                                                >
                                                    <SubIcon
                                                        className={`w-3.5 h-3.5 shrink-0 ${sub.iconColor || ''}`}
                                                    />
                                                    <span>{sub.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer / Settings Section */}
                <div className="p-3 border-t border-[#F3F4F6] space-y-1">
                    <Link
                        href="/settings"
                        onClick={handleNavClick}
                        className={navItemClass(isLinkActive('/settings'))}
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
