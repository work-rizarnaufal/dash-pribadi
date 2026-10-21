import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Modal from '@/Components/UI/Modal';
import { useToast } from '@/Context/ToastContext';
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
    Mail,
    FileText,
    Printer,
    AlertTriangle,
} from 'lucide-react';

const INITIAL_INVOICES = [
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
        items: [
            { description: 'Pengembangan Desain Sistem UI / UX', quantity: 1, unit_price: 25000000 },
            { description: 'Slicing Frontend Tailwind React SPA', quantity: 1, unit_price: 15000000 },
        ],
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
        items: [
            { description: 'Desain Komponen Figma & Token Library', quantity: 1, unit_price: 25000000 },
        ],
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
        items: [
            { description: 'Integrasi API Tracking GPS & Server Sync', quantity: 1, unit_price: 18500000 },
        ],
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
        items: [
            { description: 'Retainer Maintenance Server Web E-Commerce', quantity: 1, unit_price: 12000000 },
        ],
    },
];

export default function InvoicesIndex({ initialInvoices = [] }) {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Dynamic invoices state
    const [invoiceList, setInvoiceList] = useState(
        initialInvoices.length > 0 ? initialInvoices : INITIAL_INVOICES
    );

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [previewInvoice, setPreviewInvoice] = useState(null);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);

    // New invoice form state
    const [newInvoiceData, setNewInvoiceData] = useState({
        client_name: 'PT Sinarmas Telco Digital',
        invoice_number: `INV-2026-00${INITIAL_INVOICES.length + 1}`,
        issue_date: '2026-10-21',
        due_date: '2026-11-05',
    });

    // Dynamic line items state for invoice creation
    const [items, setItems] = useState([
        { description: 'Pengembangan Desain Sistem UI / UX', quantity: 1, unit_price: 25000000 },
        { description: 'Slicing Frontend Tailwind React SPA', quantity: 1, unit_price: 15000000 },
    ]);
    const [taxRate, setTaxRate] = useState(11);

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

    // 1. Create invoice handler
    const handleCreateInvoice = (e) => {
        if (e) e.preventDefault();
        if (items.length === 0 || !items.some((it) => it.description.trim())) {
            toast.error('Mohon tambahkan minimal satu rincian item tagihan.');
            return;
        }

        const newInv = {
            id: Date.now(),
            invoice_number: newInvoiceData.invoice_number || `INV-2026-00${invoiceList.length + 1}`,
            client_name: newInvoiceData.client_name,
            issue_date: newInvoiceData.issue_date,
            due_date: newInvoiceData.due_date,
            subtotal: subtotal,
            tax_rate: taxRate,
            total_amount: grandTotal,
            status: 'sent',
            items: [...items],
        };

        setInvoiceList([newInv, ...invoiceList]);
        setIsCreateModalOpen(false);
        setNewInvoiceData({
            client_name: 'PT Sinarmas Telco Digital',
            invoice_number: `INV-2026-00${invoiceList.length + 2}`,
            issue_date: '2026-10-21',
            due_date: '2026-11-05',
        });
        toast.success(`Faktur ${newInv.invoice_number} berhasil diterbitkan dan siap dikirim!`);
    };

    // 2. Interactive status change from preview modal
    const handleUpdateInvoiceStatus = (invId, newStatus) => {
        setInvoiceList((prev) =>
            prev.map((inv) => (inv.id === invId ? { ...inv, status: newStatus } : inv))
        );
        if (previewInvoice && previewInvoice.id === invId) {
            setPreviewInvoice({ ...previewInvoice, status: newStatus });
        }
        const label =
            newStatus === 'paid'
                ? 'LUNAS (PAID)'
                : newStatus === 'sent'
                ? 'TERKIRIM (SENT)'
                : newStatus === 'overdue'
                ? 'JATUH TEMPO (OVERDUE)'
                : 'KONSEP (DRAFT)';
        toast.success(`Status faktur diubah menjadi ${label}.`);
    };

    // 3. Print / Download handler
    const handlePrintInvoice = () => {
        window.print();
        toast.success('Membuka dialog cetak / simpan dokumen PDF...');
    };

    // 4. Send email handler
    const handleSendEmail = (inv) => {
        if (inv.status === 'draft') {
            handleUpdateInvoiceStatus(inv.id, 'sent');
        }
        toast.success(`Faktur ${inv.invoice_number} berhasil dikirimkan via email ke ${inv.client_name}!`);
    };

    // 5. Delete invoice handler
    const handleConfirmDelete = () => {
        if (!invoiceToDelete) return;
        const num = invoiceToDelete.invoice_number;
        setInvoiceList((prev) => prev.filter((inv) => inv.id !== invoiceToDelete.id));
        if (previewInvoice && previewInvoice.id === invoiceToDelete.id) {
            setPreviewInvoice(null);
        }
        setInvoiceToDelete(null);
        toast.success(`Faktur ${num} berhasil dihapus.`);
    };

    // Filter logic
    const filteredInvoices = invoiceList.filter((inv) => {
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
            subtitle="Penerbitan faktur tagihan profesional, rekap status pelunasan, dan pratinjau dokumen interaktif."
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
                        { label: `Semua (${invoiceList.length})`, value: 'all' },
                        { label: `Lunas (${invoiceList.filter(i => i.status === 'paid').length})`, value: 'paid' },
                        { label: `Terkirim (${invoiceList.filter(i => i.status === 'sent').length})`, value: 'sent' },
                        { label: `Jatuh Tempo (${invoiceList.filter(i => i.status === 'overdue').length})`, value: 'overdue' },
                        { label: `Draft (${invoiceList.filter(i => i.status === 'draft').length})`, value: 'draft' },
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
                                        onClick={() => setPreviewInvoice(inv)}
                                        className="hover:bg-[#F9FAFB]/70 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center shrink-0 group-hover:bg-[#111827] group-hover:text-white transition-colors">
                                                    <Receipt className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#111827] font-mono text-xs sm:text-sm group-hover:underline">
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
                                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
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
                                        <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => setPreviewInvoice(inv)}
                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Lihat & Aksi Dokumen Faktur"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPreviewInvoice(inv);
                                                        setTimeout(() => handlePrintInvoice(), 150);
                                                    }}
                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Cetak Dokumen"
                                                >
                                                    <Printer className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setInvoiceToDelete(inv)}
                                                    className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                                                    title="Hapus Faktur"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
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
                                        Tidak ada faktur yang sesuai kriteria pencarian.
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
                            onClick={handleCreateInvoice}
                        >
                            Simpan & Terbitkan
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleCreateInvoice} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Klien Penerima Tagihan
                            </label>
                            <select
                                value={newInvoiceData.client_name}
                                onChange={(e) =>
                                    setNewInvoiceData({
                                        ...newInvoiceData,
                                        client_name: e.target.value,
                                    })
                                }
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                            >
                                <option>PT Sinarmas Telco Digital</option>
                                <option>Studio Kroma Kreatif</option>
                                <option>Aero Nusantara Logistics</option>
                                <option>Kopi Kenari Indonesia</option>
                            </select>
                        </div>
                        <Input
                            label="Nomor Invoice"
                            value={newInvoiceData.invoice_number}
                            onChange={(e) =>
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    invoice_number: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Tanggal Terbit"
                            type="date"
                            required
                            value={newInvoiceData.issue_date}
                            onChange={(e) =>
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    issue_date: e.target.value,
                                })
                            }
                        />
                        <Input
                            label="Tanggal Jatuh Tempo"
                            type="date"
                            required
                            value={newInvoiceData.due_date}
                            onChange={(e) =>
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    due_date: e.target.value,
                                })
                            }
                        />
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
                                        placeholder="Qty"
                                        value={it.quantity}
                                        onChange={(e) => updateItem(idx, 'quantity', Number(e.target.value))}
                                        className="w-16 text-xs bg-white border border-[#E5E7EB] rounded-md px-2 py-1.5 text-[#111827] text-center focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Harga Satuan (IDR)"
                                        value={it.unit_price}
                                        onChange={(e) => updateItem(idx, 'unit_price', Number(e.target.value))}
                                        className="w-36 text-xs bg-white border border-[#E5E7EB] rounded-md px-2.5 py-1.5 text-[#111827] text-right focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                    />
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="p-1 text-[#EF4444] hover:bg-[#FEF2F2] rounded"
                                            title="Hapus baris"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calculation Summary Preview */}
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3.5 space-y-2 text-xs">
                        <div className="flex justify-between text-[#6B7280]">
                            <span>Subtotal:</span>
                            <span className="font-semibold text-[#111827] tabular-nums">
                                {formatIDR(subtotal)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-[#6B7280]">
                            <div className="flex items-center gap-1.5">
                                <span>PPN (%):</span>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                    className="w-14 text-xs bg-white border border-[#E5E7EB] rounded px-1.5 py-0.5 text-center focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                />
                            </div>
                            <span className="font-semibold text-[#111827] tabular-nums">
                                {formatIDR(taxAmount)}
                            </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#E5E7EB] font-bold text-sm text-[#111827]">
                            <span>Total Penagihan:</span>
                            <span className="font-metric text-base text-[#111827] tabular-nums">
                                {formatIDR(grandTotal)}
                            </span>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* Modal Pratinjau Faktur Resmi & Aksi Dokumen */}
            <Modal
                isOpen={!!previewInvoice}
                onClose={() => setPreviewInvoice(null)}
                title={`Faktur Resmi: ${previewInvoice?.invoice_number || ''}`}
                subtitle="Dokumen penagihan resmi siap unduh, cetak, atau perbarui status pembayaran."
                maxWidth="max-w-2xl"
                footer={
                    <>
                        <div className="flex items-center justify-between w-full">
                            <Button
                                variant="danger"
                                size="sm"
                                leftIcon={Trash2}
                                onClick={() => setInvoiceToDelete(previewInvoice)}
                            >
                                Hapus
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setPreviewInvoice(null)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={Printer}
                                    onClick={handlePrintInvoice}
                                >
                                    Cetak / PDF
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    leftIcon={Mail}
                                    onClick={() => handleSendEmail(previewInvoice)}
                                >
                                    Kirim ke Klien
                                </Button>
                            </div>
                        </div>
                    </>
                }
            >
                {previewInvoice && (
                    <div className="space-y-5 text-[#111827] font-sans">
                        {/* Interactive Status Switcher Card */}
                        <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <span className="text-xs font-semibold text-[#6B7280]">
                                Ubah Status Tagihan:
                            </span>
                            <div className="inline-flex rounded-lg border border-[#E5E7EB] p-0.5 bg-white shadow-2xs">
                                {[
                                    { key: 'paid', label: 'Lunas' },
                                    { key: 'sent', label: 'Terkirim' },
                                    { key: 'overdue', label: 'Jatuh Tempo' },
                                    { key: 'draft', label: 'Konsep' },
                                ].map((st) => (
                                    <button
                                        key={st.key}
                                        type="button"
                                        onClick={() =>
                                            handleUpdateInvoiceStatus(previewInvoice.id, st.key)
                                        }
                                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                                            previewInvoice.status === st.key
                                                ? 'bg-[#111827] text-white shadow-xs'
                                                : 'text-[#6B7280] hover:text-[#111827]'
                                        }`}
                                    >
                                        {st.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Invoice Paper Canvas */}
                        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 space-y-6">
                            {/* Header / Brand */}
                            <div className="flex items-start justify-between border-b border-[#F3F4F6] pb-5">
                                <div>
                                    <h2 className="font-display font-bold text-xl tracking-tight text-[#111827]">
                                        PULSE CRM
                                    </h2>
                                    <p className="text-xs text-[#6B7280] mt-0.5">
                                        Executive Productivity & Financial Dashboard
                                    </p>
                                    <p className="text-[11px] text-[#9CA3AF] mt-1">
                                        billing@pulsecrm.id • Jakarta, Indonesia
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="inline-block font-mono text-xs font-bold text-[#111827] bg-[#F3F4F6] px-2.5 py-1 rounded">
                                        {previewInvoice.invoice_number}
                                    </span>
                                    <div>
                                        <Badge
                                            variant={
                                                previewInvoice.status === 'paid'
                                                    ? 'growth'
                                                    : previewInvoice.status === 'overdue'
                                                    ? 'negative'
                                                    : 'secondary'
                                            }
                                        >
                                            {previewInvoice.status === 'paid'
                                                ? 'LUNAS (PAID)'
                                                : previewInvoice.status === 'overdue'
                                                ? 'JATUH TEMPO'
                                                : previewInvoice.status === 'sent'
                                                ? 'TERKIRIM (SENT)'
                                                : 'KONSEP (DRAFT)'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Bill Details Grid */}
                            <div className="grid grid-cols-2 gap-6 text-xs">
                                <div>
                                    <span className="font-semibold uppercase tracking-wider text-[#9CA3AF] text-[10px] block mb-1">
                                        Ditagihkan Kepada:
                                    </span>
                                    <p className="font-bold text-sm text-[#111827]">
                                        {previewInvoice.client_name}
                                    </p>
                                    <p className="text-[#6B7280] mt-0.5">
                                        Finance & Accounting Department
                                    </p>
                                    <p className="text-[#6B7280]">NPWP: 01.345.678.9-012.000</p>
                                </div>
                                <div className="space-y-1 text-left pl-6 border-l border-[#F3F4F6]">
                                    <div className="flex justify-between">
                                        <span className="text-[#6B7280]">Tanggal Terbit:</span>
                                        <span className="font-medium text-[#111827]">
                                            {previewInvoice.issue_date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#6B7280]">Jatuh Tempo:</span>
                                        <span className="font-medium text-[#EF4444]">
                                            {previewInvoice.due_date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#6B7280]">Mata Uang:</span>
                                        <span className="font-medium text-[#111827]">IDR (Rupiah)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items Table */}
                            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">
                                        <tr>
                                            <th className="px-3.5 py-2.5">Rincian Pekerjaan</th>
                                            <th className="px-3.5 py-2.5 text-center">Kuantitas</th>
                                            <th className="px-3.5 py-2.5 text-right">Harga Satuan</th>
                                            <th className="px-3.5 py-2.5 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F3F4F6]">
                                        {previewInvoice.items && previewInvoice.items.length > 0 ? (
                                            previewInvoice.items.map((it, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-3.5 py-3 font-medium text-[#111827]">
                                                        {it.description}
                                                    </td>
                                                    <td className="px-3.5 py-3 text-center text-[#6B7280]">
                                                        {it.quantity}
                                                    </td>
                                                    <td className="px-3.5 py-3 text-right tabular-nums text-[#6B7280]">
                                                        {formatIDR(it.unit_price)}
                                                    </td>
                                                    <td className="px-3.5 py-3 text-right font-semibold tabular-nums text-[#111827]">
                                                        {formatIDR(it.quantity * it.unit_price)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-3.5 py-3 font-medium text-[#111827]">
                                                    Layanan Pengembangan Deliverables & Maintenance Fase 1
                                                </td>
                                                <td className="px-3.5 py-3 text-center text-[#6B7280]">1</td>
                                                <td className="px-3.5 py-3 text-right tabular-nums text-[#6B7280]">
                                                    {formatIDR(previewInvoice.subtotal || previewInvoice.total_amount)}
                                                </td>
                                                <td className="px-3.5 py-3 text-right font-semibold tabular-nums text-[#111827]">
                                                    {formatIDR(previewInvoice.subtotal || previewInvoice.total_amount)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Summary Totals */}
                            <div className="flex flex-col items-end gap-1.5 text-xs pt-1">
                                <div className="flex justify-between w-64 text-[#6B7280]">
                                    <span>Subtotal:</span>
                                    <span className="font-medium tabular-nums">
                                        {formatIDR(previewInvoice.subtotal || previewInvoice.total_amount)}
                                    </span>
                                </div>
                                {previewInvoice.tax_rate > 0 && (
                                    <div className="flex justify-between w-64 text-[#6B7280]">
                                        <span>PPN ({previewInvoice.tax_rate}%):</span>
                                        <span className="font-medium tabular-nums">
                                            {formatIDR(
                                                previewInvoice.total_amount -
                                                    (previewInvoice.subtotal || previewInvoice.total_amount)
                                            )}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between w-64 pt-2 border-t border-[#E5E7EB] font-bold text-sm text-[#111827]">
                                    <span>Total Tagihan:</span>
                                    <span className="font-display font-bold tabular-nums text-base">
                                        {formatIDR(previewInvoice.total_amount)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3.5 text-xs text-[#6B7280] space-y-1">
                                <span className="font-semibold uppercase tracking-wider text-[#111827] text-[10px] block">
                                    Instruksi Pembayaran Transfer Bank:
                                </span>
                                <p className="text-[#111827] font-medium">
                                    Bank Mandiri Korporat (Cab. Jakarta Sudirman)
                                </p>
                                <p>
                                    Nomor Rekening:{' '}
                                    <span className="font-mono font-bold text-[#111827]">
                                        122-00-9823102-1
                                    </span>{' '}
                                    a/n PT Pulse Digital Kreatif
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Konfirmasi Hapus Faktur */}
            <Modal
                isOpen={!!invoiceToDelete}
                onClose={() => setInvoiceToDelete(null)}
                title="Hapus Faktur Tagihan?"
                subtitle="Tindakan ini akan menghapus dokumen faktur penagihan dari daftar."
                maxWidth="max-w-md"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setInvoiceToDelete(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleConfirmDelete}
                        >
                            Ya, Hapus Faktur
                        </Button>
                    </>
                }
            >
                {invoiceToDelete && (
                    <div className="space-y-3 text-xs text-[#4B5563]">
                        <div className="flex items-center gap-3 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[#991B1B]">
                            <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">
                                    {invoiceToDelete.invoice_number}
                                </p>
                                <p className="text-xs text-[#B91C1C]">
                                    Klien: {invoiceToDelete.client_name} • Total: {formatIDR(invoiceToDelete.total_amount)}
                                </p>
                            </div>
                        </div>
                        <p>
                            Apakah Anda yakin ingin menghapus arsip faktur ini?
                        </p>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
}
