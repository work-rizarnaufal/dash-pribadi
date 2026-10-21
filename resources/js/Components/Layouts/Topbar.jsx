import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    Search,
    Bell,
    Calendar,
    ChevronDown,
    Menu,
    User,
    LogOut,
    SlidersHorizontal,
    Check,
} from 'lucide-react';

export default function Topbar({ collapsed, setCollapsed, setMobileOpen }) {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Admin User', email: 'admin@pulsecrm.id' };

    const [profileOpen, setProfileOpen] = useState(false);
    const [periodOpen, setPeriodOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('30 Hari Terakhir');

    const periods = [
        '7 Hari Terakhir',
        '30 Hari Terakhir',
        'Bulan Ini',
        'Kuartal Ini',
        'Tahun 2026',
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-[#E5E7EB] flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
            {/* Left Area: Toggle & Search */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
                {/* Mobile Hamburger */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] lg:hidden focus:outline-none"
                    aria-label="Buka navigasi"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Desktop Collapse Toggle */}
                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] focus:outline-none"
                    title={collapsed ? "Perluas menu" : "Ciutkan menu"}
                >
                    <Menu className="w-4 h-4" />
                </button>

                {/* Universal Search Bar */}
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari klien, invoice, atau tugas..."
                        className="block w-full pl-9 pr-12 py-1.5 text-xs sm:text-sm bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-lg transition-all focus:outline-none placeholder-[#9CA3AF]"
                    />
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#9CA3AF] bg-[#FFFFFF] border border-[#E5E7EB] rounded shadow-xs">
                            ⌘K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Right Area: Period Filter, Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Period Selector Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setPeriodOpen(!periodOpen)}
                        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#111827] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] focus:outline-none transition-colors"
                    >
                        <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
                        <span>{selectedPeriod}</span>
                        <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
                    </button>

                    {periodOpen && (
                        <div
                            className="absolute right-0 mt-1.5 w-44 bg-white border border-[#E5E7EB] rounded-xl shadow-lg py-1 z-50 text-xs"
                            onClick={() => setPeriodOpen(false)}
                        >
                            {periods.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setSelectedPeriod(p)}
                                    className="w-full text-left px-3 py-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] flex items-center justify-between"
                                >
                                    <span>{p}</span>
                                    {selectedPeriod === p && (
                                        <Check className="w-3.5 h-3.5 text-[#111827]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Notifications Bell */}
                <button
                    type="button"
                    className="relative p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors focus:outline-none"
                    aria-label="Pemberitahuan"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-white" />
                </button>

                {/* User Profile Pill & Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 p-1 pl-2 text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors focus:outline-none"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#111827] text-white flex items-center justify-center font-display font-semibold text-xs shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="hidden md:inline-block max-w-[120px] truncate">
                            {user.name}
                        </span>
                        <ChevronDown className="w-3 h-3 text-[#9CA3AF] hidden sm:block" />
                    </button>

                    {profileOpen && (
                        <div
                            className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1.5 z-50"
                            onClick={() => setProfileOpen(false)}
                        >
                            <div className="px-3.5 py-2 border-b border-[#F3F4F6]">
                                <p className="text-xs font-semibold text-[#111827] truncate">
                                    {user.name}
                                </p>
                                <p className="text-[11px] text-[#6B7280] truncate">
                                    {user.email}
                                </p>
                            </div>

                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]"
                                >
                                    <User className="w-3.5 h-3.5 text-[#6B7280]" />
                                    <span>Profil Saya</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
                                    <span>Preferensi Sistem</span>
                                </Link>
                            </div>

                            <div className="border-t border-[#F3F4F6] pt-1">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#EF4444] hover:bg-[#FEF2F2]"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Keluar Akun</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

