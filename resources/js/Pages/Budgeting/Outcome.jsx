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
    ArrowUpRight,
    Paperclip,
    FileCheck,
    UploadCloud,
    Server,
    CreditCard,
    DollarSign,
} from 'lucide-react';

export default function OutcomeIndex({ initialOutcomes = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    const outcomes = initialOutcomes.length > 0 ? initialOutcomes : [
        {
            id: 1,
            description: 'Biaya Server AWS EC2 & Cloud Database RDS',
            category: 'Infrastruktur Cloud',
            transaction_date: '18 Okt 2026',
            amount: 4200000,
            has_receipt: true,
            receipt_name: 'aws-invoice-oct2026.pdf',
        },
        {
            id: 2,
            description: 'Langganan Tahunan Figma Enterprise & FigJam',
            category: 'Software & Desain',
            transaction_date: '15 Okt 2026',
            amount: 2800000,
            has_receipt: true,
            receipt_name: 'figma-subscription-rec.pdf',
        },
        {
            id: 3,
            description: 'Gaji Freelance Sub-kontraktor QA Tester',
            category: 'Tenaga Kerja',
            transaction_date: '10 Okt 2026',
            amount: 6500000,
            has_receipt: true,
            receipt_name: 'bilyet-transfer-qa.jpg',
        },
        {
            id: 4,
            description: 'Domain & SSL Renewal (*.pulsecrm.id)',
            category: 'Domain & Hosting',
            transaction_date: '03 Okt 2026',
            amount: 750000,
            has_receipt: false,
            receipt_name: null,
        },
    ];

    const totalOutcome = outcomes.reduce((sum, it) => sum + it.amount, 0);

    return (
        <AppLayout
            title="Arus Kas Keluar (Outcome)"
            subtitle="Pencatatan biaya operasional, langganan infrastruktur cloud, dan arsip bukti transaksi."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Plus}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Catat Pengeluaran
                </Button>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Total Beban Bulan Ini
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827] tabular-nums">
                        {formatIDR(totalOutcome)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                        <Badge variant="neutral">
                            -4.2% Efisiensi
                        </Badge>
                        <span className="text-[11px] text-[#6B7280]">dibanding bulan lalu</span>
                    </div>
                </Card>

                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Alokasi Terbesar
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827]">
                        Tenaga Kerja
                    </p>
                    <span className="mt-2 block text-[11px] text-[#6B7280]">
                        45.6% dari total beban operasional
                    </span>
                </Card>

                <Card noPadding className="p-5">
                    <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider font-sans">
                        Arsip Struk / Bukti
                    </span>
                    <p className="mt-2 text-2xl font-bold font-display text-[#111827] tabular-nums">
                        {outcomes.filter((o) => o.has_receipt).length} / {outcomes.length}
                    </p>
                    <span className="mt-2 block text-[11px] text-[#059669]">
                        Terdokumentasi lengkap
                    </span>
                </Card>
            </div>

            {/* Outcome Table Card */}
            <Card noPadding>
                <div className="p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                        <Input
                            placeholder="Cari pengeluaran atau kategori..."
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
                                <th className="px-5 py-3.5">Deskripsi Pengeluaran</th>
                                <th className="px-5 py-3.5">Kategori</th>
                                <th className="px-5 py-3.5">Tanggal</th>
                                <th className="px-5 py-3.5">Bukti Struk</th>
                                <th className="px-5 py-3.5 text-right">Nominal Keluar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {outcomes.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center shrink-0">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#111827] text-xs sm:text-sm">
                                                    {item.description}
                                                </p>
                                                <p className="text-xs text-[#6B7280]">
                                                    ID Transaksi #{item.id}
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
                                        {item.has_receipt ? (
                                            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]/60">
                                                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                <span className="truncate max-w-[140px] font-mono text-[11px]">
                                                    {item.receipt_name}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="text-[#9CA3AF] italic text-xs">
                                                Belum diunggah
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <span className="font-display font-semibold text-[#111827] tabular-nums text-sm">
                                            - {formatIDR(item.amount)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Catat Pengeluaran */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Catat Pengeluaran Baru"
                subtitle="Dokumentasikan biaya operasional dan simpan bukti nota transaksi."
                footer={
                    <>
                        <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(false)}>
                            Simpan Pengeluaran
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input label="Deskripsi Pengeluaran" placeholder="Contoh: Langganan Server DigitalOcean" required />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input label="Nominal Beban (IDR)" type="number" placeholder="Contoh: 1500000" required />
                        <Input label="Tanggal Transaksi" type="date" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Kategori Pengeluaran
                        </label>
                        <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                            <option>Infrastruktur Cloud & Server</option>
                            <option>Software & Lisensi Tools</option>
                            <option>Tenaga Kerja & Subkontraktor</option>
                            <option>Operasional Kantor & Komunikasi</option>
                            <option>Pemasaran & Iklan</option>
                            <option>Lain-lain</option>
                        </select>
                    </div>

                    {/* Receipt File Upload Dropzone */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Unggah Bukti Struk / Nota (Opsional)
                        </label>
                        <div className="border-2 border-dashed border-[#E5E7EB] hover:border-[#111827] rounded-xl p-4 text-center cursor-pointer transition-colors bg-[#F9FAFB]">
                            <UploadCloud className="w-6 h-6 text-[#9CA3AF] mx-auto mb-1.5" />
                            <p className="text-xs text-[#4B5563] font-medium">
                                Klik untuk mengunggah atau drag & drop file
                            </p>
                            <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                                PDF, JPG, PNG (Maks. 5MB)
                            </p>
                        </div>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}

