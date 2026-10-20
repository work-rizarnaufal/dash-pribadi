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
    Download,
    Eye,
    Receipt,
    CheckCircle,
    Trash2,
    Calendar,
    Building2,
    Check,
} from 'lucide-react';

export default function InvoicesIndex({ initialInvoices = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Dynamic line items state for invoice creation
    const [items, setItems] = useState([
        { description: 'Pengembangan Desain Sistem UI / UX', quantity: 1, unit_price: 25000000 },
        { description: 'Slicing Frontend Tailwind React SPA', quantity: 1, unit_price: 15000000 },
    ]);
    const [taxRate, setTaxRate] = useState(11); // 11% PPN standard

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    // Calculate dynamic subtotal & total
    const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unit_price || 0), 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, unit_price: 0 }]);
    };

    const removeItem = (idx) => {
        setItems(items.filter((_, i) => i !== idx));
    };

    const updateItem = (idx, field, value) => {
        const updated = [...items];
        updated[idx][field] = value;
        setItems(updated);
    };

    // Realistic invoice list
    const invoices = initialInvoices.length > 0 ? initialInvoices : [
        {
            id: 1,
            invoice_number: 'INV-2026-001',
            client_name: 'PT Sinarmas Telco Digital',
            issue_date: '10 Okt 2026',
            due_date: '25 Okt 2026',
            subtotal: 40000000,
            tax_rate: 11,
            total_amount: 44400000,
            status: 'paid',
        },
        {
            id: 2,
            invoice_number: 'INV-2026-002',
            client_name: 'Studio Kroma Kreatif',
            issue_date: '15 Okt 2026',
            due_date: '30 Okt 2026',
            subtotal: 25000000,
            tax_rate: 0,
            total_amount: 25000000,
            status: 'sent',
        },
        {
            id: 3,
            invoice_number: 'INV-2026-003',
            client_name: 'Aero Nusantara Logistics',
            issue_date: '01 Okt 2026',
            due_date: '15 Okt 2026',
            subtotal: 18500000,
            tax_rate: 11,
            total_amount: 20535000,
            status: 'overdue',
        },
        {
            id: 4,
            invoice_number: 'INV-2026-004',
            client_name: 'Kopi Kenari Indonesia',
            issue_date: '18 Okt 2026',
            due_date: '02 Nov 2026',
            subtotal: 12000000,
            tax_rate: 0,
            total_amount: 12000000,
            status: 'draft',
        },
    ];

    const filteredInvoices = invoices.filter((inv) => {
        const matchesSearch =
            inv.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.client_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ? true : inv.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AppLayout
            title="Invoicing & Penagihan"
            subtitle="Penerbitan faktur tagihan profesional, rekap status pelunasan, dan ekspor dokumen PDF."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Plus}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Buat Faktur Baru
                </Button>
            }
        >
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="relative w-full sm:w-80">
                    <Input
                        placeholder="Cari nomor invoice atau nama klien..."
                        leftIcon={Search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                        { label: 'Semua', value: 'all' },
                        { label: 'Paid (Lunas)', value: 'paid' },
                        { label: 'Sent (Terkirim)', value: 'sent' },
                        { label: 'Overdue (Jatuh Tempo)', value: 'overdue' },
                        { label: 'Draft', value: 'draft' },
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => setStatusFilter(tab.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                statusFilter === tab.value
                                    ? 'bg-[#111827] text-white shadow-xs'
                                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#111827]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Invoices Table Card */}
            <Card noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] border-b border-[#E5E7EB]">
                            <tr>
                                <th className="px-5 py-3.5">Nomor & Klien</th>
                                <th className="px-5 py-3.5">Tanggal Terbit</th>
                                <th className="px-5 py-3.5">Jatuh Tempo</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5 text-right">Total Tagihan</th>
                                <th className="px-5 py-3.5 text-center">Aksi Dokumen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {filteredInvoices.length > 0 ? (
                                filteredInvoices.map((inv) => (
                                    <tr
                                        key={inv.id}
                                        className="hover:bg-[#F9FAFB]/70 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center shrink-0">
                                                    <Receipt className="w-4 h-4 text-[#4B5563]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#111827] font-mono text-xs sm:text-sm">
                                                        {inv.invoice_number}
                                                    </p>
                                                    <p className="text-xs text-[#6B7280]">
                                                        {inv.client_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-[#4B5563]">
                                            {inv.issue_date}
                                        </td>
                                        <td className="px-5 py-4 text-xs font-medium">
                                            <span
                                                className={
                                                    inv.status === 'overdue'
                                                        ? 'text-[#EF4444] font-semibold'
                                                        : 'text-[#4B5563]'
                                                }
                                            >
                                                {inv.due_date}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge variant={inv.status}>
                                                {inv.status === 'paid'
                                                    ? 'Lunas'
                                                    : inv.status === 'sent'
                                                    ? 'Terkirim'
                                                    : inv.status === 'overdue'
                                                    ? 'Jatuh Tempo'
                                                    : 'Konsep (Draft)'}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <span className="font-display font-semibold text-[#111827] tabular-nums text-sm">
                                                {formatIDR(inv.total_amount)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    type="button"
                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Unduh PDF"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Pratinjau Faktur"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-12 text-[#9CA3AF] text-sm"
                                    >
                                        Tidak ada faktur yang sesuai filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Pembuatan Faktur Baru */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Penerbitan Faktur Baru"
                subtitle="Kalkulasi otomatis subtotal pekerjaan, pajak, dan rincian termin penagihan."
                maxWidth="max-w-2xl"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Simpan & Terbitkan
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Klien Penerima Tagihan
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                <option>PT Sinarmas Telco Digital</option>
                                <option>Studio Kroma Kreatif</option>
                                <option>Aero Nusantara Logistics</option>
                            </select>
                        </div>
                        <Input
                            label="Nomor Invoice"
                            defaultValue={`INV-2026-00${invoices.length + 1}`}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input label="Tanggal Terbit" type="date" required />
                        <Input label="Tanggal Jatuh Tempo" type="date" required />
                    </div>

                    {/* Dynamic Invoice Items */}
                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                                Rincian Pekerjaan / Item
                            </span>
                            <button
                                type="button"
                                onClick={addItem}
                                className="text-xs text-[#111827] font-semibold hover:underline flex items-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" /> Tambah Baris
                            </button>
                        </div>

                        <div className="space-y-2">
                            {items.map((it, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]"
                                >
                                    <input
                                        type="text"
                                        placeholder="Deskripsi jasa / deliverable..."
                                        value={it.description}
                                        onChange={(e) => updateItem(idx, 'description', e.target.value)}
                                        className="flex-1 text-xs bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1.5 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        value={it.quantity}
                                        onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                                        className="w-16 text-xs bg-white border border-[#E5E7EB] rounded-md px-2 py-1.5 text-center text-[#111827] focus:outline-none"
                                        title="Kuantitas"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        step="100000"
                                        value={it.unit_price}
                                        onChange={(e) => updateItem(idx, 'unit_price', parseFloat(e.target.value) || 0)}
                                        className="w-32 text-xs bg-white border border-[#E5E7EB] rounded-md px-2 py-1.5 text-right text-[#111827] focus:outline-none"
                                        title="Harga Satuan"
                                    />
                                    <span className="text-xs font-semibold font-display tabular-nums text-[#111827] w-28 text-right">
                                        {formatIDR(it.quantity * it.unit_price)}
                                    </span>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="text-[#EF4444] hover:bg-[#FEF2F2] p-1 rounded-md"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals Summary */}
                    <div className="border-t border-[#F3F4F6] pt-3 flex flex-col items-end gap-1.5 text-xs">
                        <div className="flex items-center justify-between w-60">
                            <span className="text-[#6B7280]">Subtotal:</span>
                            <span className="font-semibold tabular-nums text-[#111827]">
                                {formatIDR(subtotal)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between w-60">
                            <span className="text-[#6B7280]">Pajak PPN ({taxRate}%):</span>
                            <span className="font-semibold tabular-nums text-[#111827]">
                                {formatIDR(taxAmount)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between w-60 pt-1.5 border-t border-[#E5E7EB] font-bold text-sm">
                            <span className="text-[#111827]">Total Akhir:</span>
                            <span className="font-display text-[#111827] tabular-nums">
                                {formatIDR(grandTotal)}
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}

