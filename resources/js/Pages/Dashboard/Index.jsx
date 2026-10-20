import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import StackedBarChart from '@/Components/Charts/StackedBarChart';
import HeatmapMatrix from '@/Components/Charts/HeatmapMatrix';
import { Link } from '@inertiajs/react';
import {
    TrendingUp,
    FolderKanban,
    Clock,
    Wallet,
    UserPlus,
    FileText,
    ArrowDownLeft,
    ArrowUpRight,
    ArrowRight,
    CheckCircle2,
    Calendar,
} from 'lucide-react';

export default function DashboardIndex({ metrics, chartData, recentTransactions, upcomingTasks }) {
    // Format currency to IDR
    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    // Default sample data adhering to PRD requirements
    const defaultMetrics = metrics || {
        netRevenue: 84500000,
        netRevenueGrowth: '+18.4%',
        activeProjects: 6,
        activeProjectsSubtitle: '2 selesai minggu ini',
        pendingInvoices: 3,
        pendingInvoicesTotal: 28500000,
        cashBalance: 142000000,
        cashBalanceGrowth: '+8.1%',
    };

    const defaultChartData = chartData || [
        { label: 'Mei', income: 42000000, outcome: 18000000 },
        { label: 'Jun', income: 51000000, outcome: 22000000 },
        { label: 'Jul', income: 48000000, outcome: 19500000 },
        { label: 'Ags', income: 63000000, outcome: 25000000 },
        { label: 'Sep', income: 72000000, outcome: 28000000 },
        { label: 'Okt', income: 84500000, outcome: 31000000 },
    ];

    const defaultTransactions = recentTransactions || [
        {
            id: 1,
            title: 'Pembayaran Termin 2 - PT Sinarmas Telco',
            category: 'Proyek Web App',
            type: 'income',
            amount: 32500000,
            date: '20 Okt 2026',
        },
        {
            id: 2,
            title: 'Langganan Server Cloud AWS & Vercel',
            category: 'Infrastruktur',
            type: 'outcome',
            amount: 4200000,
            date: '18 Okt 2026',
        },
        {
            id: 3,
            title: 'DP Desain Sistem UI - Studio Kroma',
            category: 'Branding & UI',
            type: 'income',
            amount: 15000000,
            date: '17 Okt 2026',
        },
        {
            id: 4,
            title: 'Lisensi Software Figma & GitHub Enterprise',
            category: 'Tools & Langganan',
            type: 'outcome',
            amount: 1850000,
            date: '15 Okt 2026',
        },
    ];

    const defaultTasks = upcomingTasks || [
        {
            id: 1,
            title: 'Finalisasi API Integration Payment Gateway',
            client: 'PT Sinarmas Telco',
            priority: 'high',
            dueDate: 'Besok',
        },
        {
            id: 2,
            title: 'Review Wireframe Dashboard Desain Sistem',
            client: 'Studio Kroma',
            priority: 'medium',
            dueDate: '23 Okt 2026',
        },
        {
            id: 3,
            title: 'Deployment Staging Pulse CRM v1.2',
            client: 'Internal Project',
            priority: 'low',
            dueDate: '26 Okt 2026',
        },
    ];

    return (
        <AppLayout
            title="Beranda Eksekutif"
            subtitle="Ringkasan performa finansial dan operasional proyek terkini."
            actions={
                <div className="flex items-center gap-2">
                    <Link href="/clients">
                        <Button variant="secondary" size="sm" leftIcon={UserPlus}>
                            Tambah Klien
                        </Button>
                    </Link>
                    <Link href="/invoices">
                        <Button variant="primary" size="sm" leftIcon={FileText}>
                            Buat Invoice
                        </Button>
                    </Link>
                </div>
            }
        >
            {/* 1. KPI Metric Cards (Grid 4 Kolom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
                {/* Metric 1: Net Revenue */}
                <Card noPadding className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                            Pendapatan Bersih
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                            <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                        <div className="font-metric font-bold text-2xl text-[#111827]">
                            {formatIDR(defaultMetrics.netRevenue)}
                        </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                        <Badge variant="growth" trend="up">
                            {defaultMetrics.netRevenueGrowth}
                        </Badge>
                        <span className="text-[11px] text-[#6B7280]">vs bulan lalu</span>
                    </div>
                </Card>

                {/* Metric 2: Proyek Aktif */}
                <Card noPadding className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                            Proyek Berjalan
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center">
                            <FolderKanban className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="font-metric font-bold text-2xl text-[#111827]">
                        {defaultMetrics.activeProjects}{' '}
                        <span className="text-sm font-normal text-[#6B7280]">Proyek</span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                        <span className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {defaultMetrics.activeProjectsSubtitle}
                        </span>
                    </div>
                </Card>

                {/* Metric 3: Invoice Tertunda */}
                <Card noPadding className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                            Invoice Tertunda
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="font-metric font-bold text-2xl text-[#111827]">
                        {formatIDR(defaultMetrics.pendingInvoicesTotal)}
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                        <Badge variant="warning">{defaultMetrics.pendingInvoices} Invoice</Badge>
                        <span className="text-[11px] text-[#6B7280]">menunggu pelunasan</span>
                    </div>
                </Card>

                {/* Metric 4: Saldo Kas */}
                <Card noPadding className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                            Sisa Saldo Kas
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center">
                            <Wallet className="w-3.5 h-3.5" />
                        </div>
                    </div>
                    <div className="font-metric font-bold text-2xl text-[#111827]">
                        {formatIDR(defaultMetrics.cashBalance)}
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                        <Badge variant="growth" trend="up">
                            {defaultMetrics.cashBalanceGrowth}
                        </Badge>
                        <span className="text-[11px] text-[#6B7280]">likuiditas sehat</span>
                    </div>
                </Card>
            </div>

            {/* 2. Charts & Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
                {/* Financial Stacked Bar Chart (8 Columns) */}
                <div className="lg:col-span-8">
                    <Card
                        title="Arus Keuangan Bulanan"
                        subtitle="Perbandingan komparasi pemasukan faktur terhadap beban operasional 6 bulan terakhir."
                        action={
                            <Link href="/budgeting/income" className="text-xs text-[#4B5563] hover:text-[#111827] font-medium flex items-center gap-1">
                                Detail Aliran Kas <ArrowRight className="w-3 h-3" />
                            </Link>
                        }
                    >
                        <StackedBarChart data={defaultChartData} height={230} />
                    </Card>
                </div>

                {/* Heatmap Activity Matrix (4 Columns) */}
                <div className="lg:col-span-4">
                    <Card
                        title="Intensitas Tugas Harian"
                        subtitle="Frekuensi penyelesaian pekerjaan dalam 18 minggu terakhir."
                        action={
                            <Link href="/tasks" className="text-xs text-[#4B5563] hover:text-[#111827] font-medium flex items-center gap-1">
                                Buka Kalender <ArrowRight className="w-3 h-3" />
                            </Link>
                        }
                    >
                        <HeatmapMatrix weeks={15} />
                    </Card>
                </div>
            </div>

            {/* 3. Operational Details (2 Columns: Recent Transactions & Priority Tasks) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Recent Financial Transactions */}
                <Card
                    title="Transaksi Terakhir"
                    subtitle="Pencatatan pemasukan invoice dan pengeluaran terbaru."
                    action={
                        <Link href="/budgeting/income">
                            <Button variant="ghost" size="sm">
                                Lihat Semua
                            </Button>
                        </Link>
                    }
                    noPadding
                >
                    <div className="divide-y divide-[#F3F4F6]">
                        {defaultTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                            tx.type === 'income'
                                                ? 'bg-[#ECFDF5] text-[#10B981]'
                                                : 'bg-[#FEF2F2] text-[#EF4444]'
                                        }`}
                                    >
                                        {tx.type === 'income' ? (
                                            <ArrowDownLeft className="w-4 h-4" />
                                        ) : (
                                            <ArrowUpRight className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm font-semibold text-[#111827] leading-snug">
                                            {tx.title}
                                        </p>
                                        <p className="text-[11px] text-[#6B7280]">
                                            {tx.category} • {tx.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p
                                        className={`text-xs sm:text-sm font-semibold font-display tabular-nums ${
                                            tx.type === 'income' ? 'text-[#10B981]' : 'text-[#111827]'
                                        }`}
                                    >
                                        {tx.type === 'income' ? '+' : '-'} {formatIDR(tx.amount)}
                                    </p>
                                    <Badge variant={tx.type === 'income' ? 'paid' : 'negative'} size="xs">
                                        {tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Priority Tasks & Milestones */}
                <Card
                    title="Tugas & Tenggat Waktu"
                    subtitle="Daftar prioritas pekerjaan yang mendekati batas waktu."
                    action={
                        <Link href="/tasks">
                            <Button variant="ghost" size="sm">
                                Board Kanban
                            </Button>
                        </Link>
                    }
                    noPadding
                >
                    <div className="divide-y divide-[#F3F4F6]">
                        {defaultTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors">
                                <div className="space-y-1">
                                    <p className="text-xs sm:text-sm font-semibold text-[#111827] leading-snug">
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                                        <span className="font-medium text-[#4B5563]">{task.client}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                                            {task.dueDate}
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Badge variant={task.priority} size="xs">
                                        Prioritas {task.priority.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
