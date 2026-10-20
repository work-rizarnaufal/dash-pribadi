import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Modal from '@/Components/UI/Modal';
import {
    Plus,
    Search,
    ArrowDownLeft,
    TrendingUp,
    Receipt,
    Wallet,
    Calendar,
    Filter,
} from 'lucide-react';

export default function IncomeIndex({ initialIncome = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    const incomes = initialIncome.length > 0 ? initialIncome : [
        {
            id: 1,
            description: 'Pelunasan Invoice #INV-2026-001',
            client: 'PT Sinarmas Telco Digital',
            category: 'Proyek Web App',
            transaction_date: '20 Okt 2026',
            amount: 44400000,
            invoice_id: 'INV-2026-001',
        },
        {
            id: 2,
            description: 'Uang Muka (DP) Slicing React Inertia',
            client: 'Studio Kroma Kreatif',
            category: 'UI / UX Design',
            transaction_date: '16 Okt 2026',
            amount: 15000000,
            invoice_id: 'INV-2026-002',
        },
        {
            id: 3,
            description: 'Konsultasi Arsitektur Cloud AWS',
            client: 'Aero Nusantara Logistics',
            category: 'Konsultasi Teknis',
            transaction_date: '12 Okt 2026',
            amount: 8500000,
            invoice_id: null,
        },
        {
            id: 4,
            description: 'Maintenance Bulanan & Security Patching',
            client: 'Kopi Kenari Indonesia',
            category: 'Retainer Bulanan',
            transaction_date: '05 Okt 2026',
            amount: 6000000,
            invoice_id: null,
        },
    ];

    const totalIncome = incomes.reduce((sum, it) => sum + it.amount, 0);

    return (
        <AppLayout
            title="Arus Kas Masuk (Income)"
            subtitle="Pencatatan penerimaan pelunasan invoice dan sumber pendapatan tambahan."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Plus}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Catat Pemasukan
                </Button>
            }
        >
            {/* Summary KPI Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Total Pemasukan Bulan Ini
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827] tabular-nums">
                        {formatIDR(totalIncome)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                        <Badge variant="growth" trend="up">
                            +12.8%
                        </Badge>
                        <span className="text-[11px] text-[#6B7280]">vs September 2026</span>
                    </div>
                </Card>

                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Transaksi Berhasil
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827] tabular-nums">
                        {incomes.length}{' '}
                        <span className="text-sm font-normal text-[#6B7280]">Transaksi</span>
                    </p>
                    <span className="mt-2 block text-[11px] text-[#059669]">
                        100% tervalidasi rekening
                    </span>
                </Card>

                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Rata-Rata per Transaksi
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827] tabular-nums">
                        {formatIDR(incomes.length > 0 ? totalIncome / incomes.length : 0)}
                    </p>
                    <span className="mt-2 block text-[11px] text-[#6B7280]">
                        Kategori dominan: Proyek Web App
                    </span>
                </Card>
            </div>

            {/* Income Table Card */}
            <Card noPadding>
                <div className="p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                        <Input
                            placeholder="Cari deskripsi atau klien..."
                            leftIcon={Search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] border-b border-[#E5E7EB]">
                            <tr>
                                <th className="px-5 py-3.5">Deskripsi & Klien</th>
                                <th className="px-5 py-3.5">Kategori</th>
                                <th className="px-5 py-3.5">Tanggal</th>
                                <th className="px-5 py-3.5">Invoice Terkait</th>
                                <th className="px-5 py-3.5 text-right">Nominal Masuk</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {incomes.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                                                <ArrowDownLeft className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#111827] text-xs sm:text-sm">
                                                    {item.description}
                                                </p>
                                                <p className="text-xs text-[#6B7280]">
                                                    {item.client}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-xs text-[#4B5563]">
                                        <Badge variant="neutral" size="xs">
                                            {item.category}
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-4 text-xs text-[#6B7280]">
                                        {item.transaction_date}
                                    </td>
                                    <td className="px-5 py-4 text-xs">
                                        {item.invoice_id ? (
                                            <span className="font-mono text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]/60">
                                                {item.invoice_id}
                                            </span>
                                        ) : (
                                            <span className="text-[#9CA3AF]">Di luar invoice</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <span className="font-display font-semibold text-[#10B981] tabular-nums text-sm">
                                            + {formatIDR(item.amount)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Tambah Pemasukan */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Catat Pemasukan Baru"
                subtitle="Tambahkan pencatatan arus kas masuk dari klien atau sumber lain."
                footer={
                    <>
                        <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(false)}>
                            Simpan Transaksi
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input label="Deskripsi Pemasukan" placeholder="Contoh: Pembayaran Termin 1 Proyek" required />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input label="Nominal (IDR)" type="number" placeholder="Contoh: 15000000" required />
                        <Input label="Tanggal Transaksi" type="date" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Kategori
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                <option>Proyek Web App</option>
                                <option>UI / UX Design</option>
                                <option>Konsultasi Teknis</option>
                                <option>Retainer Bulanan</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Tautkan ke Invoice
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                <option value="">Tanpa Invoice</option>
                                <option value="INV-2026-001">INV-2026-001 (PT Sinarmas Telco)</option>
                                <option value="INV-2026-002">INV-2026-002 (Studio Kroma)</option>
                            </select>
                        </div>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}

