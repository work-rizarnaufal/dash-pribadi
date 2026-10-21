import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Modal from '@/Components/UI/Modal';
import { useToast } from '@/Context/ToastContext';
import {
    Search,
    UserPlus,
    Building2,
    Mail,
    Phone,
    MoreHorizontal,
    Edit2,
    Trash2,
    FileText,
    ExternalLink,
    Eye,
    FolderKanban,
    Receipt,
    Copy,
    CheckCircle2,
    Check,
    AlertTriangle,
} from 'lucide-react';
import { router } from '@inertiajs/react';

const INITIAL_CLIENTS = [
    {
        id: 1,
        company_name: 'PT Sinarmas Telco Digital',
        contact_person: 'Budi Hartono',
        email: 'budi.h@sinarmas.co.id',
        phone: '+62 811-9238-102',
        status: 'active',
        contract_value: 125000000,
        active_projects: 2,
        notes: 'Enterprise account. Pembayaran termin lancar via transfer korporat.',
    },
    {
        id: 2,
        company_name: 'Studio Kroma Kreatif',
        contact_person: 'Nadia Salsabila',
        email: 'nadia@kroma.design',
        phone: '+62 812-4455-890',
        status: 'active',
        contract_value: 45000000,
        active_projects: 1,
        notes: 'Fokus pengerjaan UI Design System & Component Library.',
    },
    {
        id: 3,
        company_name: 'Aero Nusantara Logistics',
        contact_person: 'Hendra Gunawan',
        email: 'hendra@aeronusantara.id',
        phone: '+62 813-7788-990',
        status: 'lead',
        contract_value: 68000000,
        active_projects: 0,
        notes: 'Tahap negosiasi proposal redesign sistem monitoring tracking.',
    },
    {
        id: 4,
        company_name: 'Kopi Kenari Indonesia',
        contact_person: 'Reza Pratama',
        email: 'reza@kopikenari.com',
        phone: '+62 817-1234-567',
        status: 'inactive',
        contract_value: 18000000,
        active_projects: 0,
        notes: 'Proyek e-commerce POS telah serah terima Q1 2026.',
    },
];

export default function ClientsIndex({ clients = [] }) {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Interactive client list state
    const [clientList, setClientList] = useState(
        clients.length > 0 ? clients : INITIAL_CLIENTS
    );

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientToEdit, setClientToEdit] = useState(null);
    const [clientToDelete, setClientToDelete] = useState(null);

    // Add client form state
    const [newClient, setNewClient] = useState({
        company_name: '',
        contact_person: '',
        status: 'active',
        email: '',
        phone: '',
        contract_value: '',
        notes: '',
    });

    // Edit client form state
    const [editFormData, setEditFormData] = useState({
        id: null,
        company_name: '',
        contact_person: '',
        status: 'active',
        email: '',
        phone: '',
        contract_value: '',
        notes: '',
    });

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    // Filter logic
    const filteredClients = clientList.filter((client) => {
        const matchesSearch =
            client.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ? true : client.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // 1. Create client handler
    const handleSaveClient = (e) => {
        if (e) e.preventDefault();
        if (!newClient.company_name.trim() || !newClient.contact_person.trim()) {
            toast.error('Mohon isi nama perusahaan dan nama kontak utama.');
            return;
        }

        const created = {
            id: Date.now(),
            company_name: newClient.company_name.trim(),
            contact_person: newClient.contact_person.trim(),
            status: newClient.status,
            email: newClient.email.trim() || 'info@' + newClient.company_name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
            phone: newClient.phone.trim() || '+62 812-0000-0000',
            contract_value: Number(newClient.contract_value) || 0,
            active_projects: newClient.status === 'active' ? 1 : 0,
            notes: newClient.notes.trim() || 'Klien baru didaftarkan.',
        };

        setClientList([created, ...clientList]);
        setIsAddModalOpen(false);
        setNewClient({
            company_name: '',
            contact_person: '',
            status: 'active',
            email: '',
            phone: '',
            contract_value: '',
            notes: '',
        });
        toast.success(`Klien "${created.company_name}" berhasil didaftarkan!`);
    };

    // 2. Open edit modal
    const handleOpenEdit = (client) => {
        setEditFormData({
            id: client.id,
            company_name: client.company_name,
            contact_person: client.contact_person,
            status: client.status,
            email: client.email,
            phone: client.phone,
            contract_value: client.contract_value,
            notes: client.notes || '',
        });
        setClientToEdit(client);
    };

    // 3. Save edited client
    const handleSaveEditClient = (e) => {
        if (e) e.preventDefault();
        if (!editFormData.company_name.trim() || !editFormData.contact_person.trim()) {
            toast.error('Mohon lengkapi nama perusahaan dan kontak utama.');
            return;
        }

        const updated = {
            ...clientToEdit,
            company_name: editFormData.company_name.trim(),
            contact_person: editFormData.contact_person.trim(),
            status: editFormData.status,
            email: editFormData.email.trim(),
            phone: editFormData.phone.trim(),
            contract_value: Number(editFormData.contract_value) || 0,
            notes: editFormData.notes.trim(),
        };

        setClientList((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
        );

        if (selectedClient && selectedClient.id === updated.id) {
            setSelectedClient(updated);
        }

        setClientToEdit(null);
        toast.success(`Data klien "${updated.company_name}" berhasil diperbarui!`);
    };

    // 4. Update status directly from detail modal
    const handleUpdateStatus = (clientId, newStatus) => {
        setClientList((prev) =>
            prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
        );
        if (selectedClient && selectedClient.id === clientId) {
            setSelectedClient({ ...selectedClient, status: newStatus });
        }
        const statusLabel =
            newStatus === 'active'
                ? 'Aktif'
                : newStatus === 'lead'
                ? 'Prospek (Lead)'
                : 'Nonaktif';
        toast.success(`Status kemitraan diubah menjadi "${statusLabel}".`);
    };

    // 5. Delete client handler
    const handleConfirmDelete = () => {
        if (!clientToDelete) return;
        const name = clientToDelete.company_name;
        setClientList((prev) => prev.filter((c) => c.id !== clientToDelete.id));
        if (selectedClient && selectedClient.id === clientToDelete.id) {
            setSelectedClient(null);
        }
        setClientToDelete(null);
        toast.success(`Klien "${name}" telah dihapus.`);
    };

    // 6. Copy text utility
    const handleCopy = (text, label) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            toast.success(`${label} berhasil disalin ke clipboard!`);
        } else {
            toast.info(text);
        }
    };

    return (
        <AppLayout
            title="Manajemen Klien"
            subtitle="Kelola kontak, status hubungan kemitraan, dan akumulasi nilai kontrak klien."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={UserPlus}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Tambah Klien
                </Button>
            }
        >
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="relative w-full sm:w-80">
                    <Input
                        placeholder="Cari perusahaan, kontak, atau email..."
                        leftIcon={Search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                        { label: `Semua Klien (${clientList.length})`, value: 'all' },
                        { label: `Aktif (${clientList.filter(c => c.status === 'active').length})`, value: 'active' },
                        { label: `Prospek (${clientList.filter(c => c.status === 'lead').length})`, value: 'lead' },
                        { label: `Nonaktif (${clientList.filter(c => c.status === 'inactive').length})`, value: 'inactive' },
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

            {/* Client Table Card */}
            <Card noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] border-b border-[#E5E7EB]">
                            <tr>
                                <th className="px-5 py-3.5">Perusahaan & Kontak</th>
                                <th className="px-5 py-3.5">Kontak Langsung</th>
                                <th className="px-5 py-3.5">Status Kemitraan</th>
                                <th className="px-5 py-3.5">Proyek Aktif</th>
                                <th className="px-5 py-3.5 text-right">Nilai Kontrak</th>
                                <th className="px-5 py-3.5 text-center">Aksi Cepat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="hover:bg-[#F9FAFB]/70 transition-colors group cursor-pointer"
                                        onClick={() => setSelectedClient(client)}
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center font-semibold text-xs shrink-0 group-hover:bg-[#111827] group-hover:text-white transition-colors">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-[#111827] leading-snug group-hover:underline">
                                                        {client.company_name}
                                                    </span>
                                                    <p className="text-xs text-[#6B7280]">
                                                        {client.contact_person}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="text-xs space-y-0.5">
                                                <p className="text-[#111827] flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                                    <span className="hover:underline cursor-pointer" onClick={() => handleCopy(client.email, 'Email')}>
                                                        {client.email}
                                                    </span>
                                                </p>
                                                <p className="text-[#6B7280] flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                                    <span className="hover:underline cursor-pointer" onClick={() => handleCopy(client.phone, 'Telepon')}>
                                                        {client.phone}
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                            <Badge variant={client.status}>
                                                {client.status === 'active'
                                                    ? 'Aktif'
                                                    : client.status === 'lead'
                                                    ? 'Prospek'
                                                    : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 text-xs font-medium text-[#4B5563]">
                                            {client.active_projects > 0 ? (
                                                <span className="text-[#111827] font-semibold">
                                                    {client.active_projects} Berjalan
                                                </span>
                                            ) : (
                                                <span className="text-[#9CA3AF]">Tidak Ada</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <span className="font-display font-semibold text-[#111827] tabular-nums">
                                                {formatIDR(client.contract_value)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedClient(client)}
                                                    className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Lihat Detail Profil & Aksi Klien"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenEdit(client)}
                                                    className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Edit Data Klien"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setClientToDelete(client)}
                                                    className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                                                    title="Hapus Klien"
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
                                        Tidak ada data klien yang cocok dengan filter pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Tambah Klien Baru */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Tambah Klien Baru"
                subtitle="Masukkan informasi perusahaan dan kontak utama kemitraan."
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSaveClient}
                        >
                            Simpan Klien
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleSaveClient} className="space-y-4">
                    <Input
                        label="Nama Perusahaan"
                        placeholder="Contoh: PT Teknologi Bangsa"
                        required
                        value={newClient.company_name}
                        onChange={(e) =>
                            setNewClient({ ...newClient, company_name: e.target.value })
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Nama Kontak Utama (PIC)"
                            placeholder="Contoh: Ahmad Fauzi"
                            required
                            value={newClient.contact_person}
                            onChange={(e) =>
                                setNewClient({ ...newClient, contact_person: e.target.value })
                            }
                        />
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Status Kemitraan
                            </label>
                            <select
                                value={newClient.status}
                                onChange={(e) =>
                                    setNewClient({ ...newClient, status: e.target.value })
                                }
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                            >
                                <option value="active">Aktif</option>
                                <option value="lead">Prospek (Lead)</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Email Perusahaan"
                            type="email"
                            placeholder="kontak@perusahaan.com"
                            value={newClient.email}
                            onChange={(e) =>
                                setNewClient({ ...newClient, email: e.target.value })
                            }
                        />
                        <Input
                            label="Nomor Telepon / WhatsApp"
                            placeholder="+62 812-xxxx-xxxx"
                            value={newClient.phone}
                            onChange={(e) =>
                                setNewClient({ ...newClient, phone: e.target.value })
                            }
                        />
                    </div>
                    <Input
                        label="Nilai Akumulasi Kontrak (IDR)"
                        type="number"
                        placeholder="Contoh: 50000000"
                        value={newClient.contract_value}
                        onChange={(e) =>
                            setNewClient({ ...newClient, contract_value: e.target.value })
                        }
                    />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Catatan Tambahan
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Catatan scope kemitraan atau preferensi komunikasi..."
                            value={newClient.notes}
                            onChange={(e) =>
                                setNewClient({ ...newClient, notes: e.target.value })
                            }
                            className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                        />
                    </div>
                </form>
            </Modal>

            {/* Modal Detail Profil Klien & Aksi Interaktif */}
            <Modal
                isOpen={!!selectedClient}
                onClose={() => setSelectedClient(null)}
                title={selectedClient?.company_name || 'Profil Klien'}
                subtitle="Ringkasan profil kemitraan, status alur kerja, dan aksi langsung."
                maxWidth="max-w-2xl"
                footer={
                    <>
                        <div className="flex items-center justify-between w-full">
                            <Button
                                variant="danger"
                                size="sm"
                                leftIcon={Trash2}
                                onClick={() => {
                                    setClientToDelete(selectedClient);
                                }}
                            >
                                Hapus
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setSelectedClient(null)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={Edit2}
                                    onClick={() => {
                                        handleOpenEdit(selectedClient);
                                    }}
                                >
                                    Edit Data
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    leftIcon={Receipt}
                                    onClick={() => {
                                        setSelectedClient(null);
                                        router.visit('/invoices');
                                    }}
                                >
                                    Buat Faktur
                                </Button>
                            </div>
                        </div>
                    </>
                }
            >
                {selectedClient && (
                    <div className="space-y-5 text-xs text-[#111827]">
                        {/* Company Card Header with Interactive Status Switcher */}
                        <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-xs">
                                        <Building2 className="w-6 h-6 text-[#111827]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base text-[#111827]">
                                            {selectedClient.company_name}
                                        </h3>
                                        <p className="text-xs text-[#6B7280] mt-0.5">
                                            PIC: <span className="font-medium text-[#111827]">{selectedClient.contact_person}</span>
                                        </p>
                                    </div>
                                </div>
                                <Badge variant={selectedClient.status}>
                                    {selectedClient.status === 'active'
                                        ? 'Kemitraan Aktif'
                                        : selectedClient.status === 'lead'
                                        ? 'Tahap Prospek (Lead)'
                                        : 'Nonaktif'}
                                </Badge>
                            </div>

                            {/* Interactive Status Segmented Switcher */}
                            <div className="pt-2 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold text-[#6B7280]">
                                    Ubah Status Kemitraan:
                                </span>
                                <div className="inline-flex rounded-lg border border-[#E5E7EB] p-0.5 bg-white shadow-2xs">
                                    {[
                                        { key: 'active', label: 'Aktif' },
                                        { key: 'lead', label: 'Prospek' },
                                        { key: 'inactive', label: 'Nonaktif' },
                                    ].map((st) => (
                                        <button
                                            key={st.key}
                                            type="button"
                                            onClick={() => handleUpdateStatus(selectedClient.id, st.key)}
                                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                                                selectedClient.status === st.key
                                                    ? 'bg-[#111827] text-white shadow-xs'
                                                    : 'text-[#6B7280] hover:text-[#111827]'
                                            }`}
                                        >
                                            {st.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3 Metric Summary Pills */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl text-center">
                                <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                    Total Kontrak
                                </span>
                                <span className="font-metric font-bold text-sm text-[#111827]">
                                    {formatIDR(selectedClient.contract_value)}
                                </span>
                            </div>
                            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl text-center">
                                <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                    Proyek Berjalan
                                </span>
                                <span className="font-metric font-bold text-sm text-[#111827]">
                                    {selectedClient.active_projects} Proyek
                                </span>
                            </div>
                            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl text-center">
                                <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                    ID Klien
                                </span>
                                <span className="font-mono font-semibold text-xs text-[#4B5563]">
                                    #{selectedClient.id}
                                </span>
                            </div>
                        </div>

                        {/* Direct Contact Information with Instant Copy Buttons */}
                        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#6B7280] block">
                                Jalur Komunikasi Resmi (Klik untuk Salin)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div
                                    onClick={() => handleCopy(selectedClient.email, 'Alamat Email')}
                                    className="flex items-center justify-between p-2.5 bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] cursor-pointer transition-colors"
                                    title="Klik untuk menyalin email"
                                >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <Mail className="w-4 h-4 text-[#4B5563] shrink-0" />
                                        <span className="truncate font-medium text-[#111827]">
                                            {selectedClient.email}
                                        </span>
                                    </div>
                                    <Copy className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                                </div>
                                <div
                                    onClick={() => handleCopy(selectedClient.phone, 'Nomor Telepon')}
                                    className="flex items-center justify-between p-2.5 bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] cursor-pointer transition-colors"
                                    title="Klik untuk menyalin kontak"
                                >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <Phone className="w-4 h-4 text-[#4B5563] shrink-0" />
                                        <span className="truncate font-medium text-[#111827]">
                                            {selectedClient.phone}
                                        </span>
                                    </div>
                                    <Copy className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                                </div>
                            </div>
                        </div>

                        {/* Partnership Notes */}
                        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#6B7280] block">
                                Catatan Kemitraan & Scope Akun
                            </span>
                            <p className="text-xs text-[#4B5563] leading-relaxed">
                                {selectedClient.notes || 'Belum ada catatan khusus untuk klien ini.'}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Edit Klien */}
            <Modal
                isOpen={!!clientToEdit}
                onClose={() => setClientToEdit(null)}
                title={`Edit Profil: ${clientToEdit?.company_name || ''}`}
                subtitle="Perbarui data kontak, estimasi kontrak, atau catatan kemitraan."
                maxWidth="max-w-2xl"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setClientToEdit(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSaveEditClient}
                        >
                            Simpan Perubahan
                        </Button>
                    </>
                }
            >
                {clientToEdit && (
                    <form onSubmit={handleSaveEditClient} className="space-y-4">
                        <Input
                            label="Nama Perusahaan"
                            required
                            value={editFormData.company_name}
                            onChange={(e) =>
                                setEditFormData({
                                    ...editFormData,
                                    company_name: e.target.value,
                                })
                            }
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <Input
                                label="Nama Kontak Utama (PIC)"
                                required
                                value={editFormData.contact_person}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        contact_person: e.target.value,
                                    })
                                }
                            />
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Status Kemitraan
                                </label>
                                <select
                                    value={editFormData.status}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            status: e.target.value,
                                        })
                                    }
                                    className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                >
                                    <option value="active">Aktif</option>
                                    <option value="lead">Prospek (Lead)</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <Input
                                label="Email Perusahaan"
                                type="email"
                                value={editFormData.email}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Nomor Telepon / WhatsApp"
                                value={editFormData.phone}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Input
                            label="Nilai Akumulasi Kontrak (IDR)"
                            type="number"
                            value={editFormData.contract_value}
                            onChange={(e) =>
                                setEditFormData({
                                    ...editFormData,
                                    contract_value: e.target.value,
                                })
                            }
                        />
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Catatan Kemitraan
                            </label>
                            <textarea
                                rows={3}
                                value={editFormData.notes}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        notes: e.target.value,
                                    })
                                }
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                            />
                        </div>
                    </form>
                )}
            </Modal>

            {/* Modal Konfirmasi Hapus Klien */}
            <Modal
                isOpen={!!clientToDelete}
                onClose={() => setClientToDelete(null)}
                title="Hapus Klien Kemitraan?"
                subtitle="Tindakan ini akan menghapus klien beserta riwayatnya dari tampilan direktori."
                maxWidth="max-w-md"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setClientToDelete(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleConfirmDelete}
                        >
                            Ya, Hapus Klien
                        </Button>
                    </>
                }
            >
                {clientToDelete && (
                    <div className="space-y-3 text-xs text-[#4B5563]">
                        <div className="flex items-center gap-3 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[#991B1B]">
                            <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">
                                    {clientToDelete.company_name}
                                </p>
                                <p className="text-xs text-[#B91C1C]">
                                    PIC: {clientToDelete.contact_person}
                                </p>
                            </div>
                        </div>
                        <p>
                            Apakah Anda yakin ingin menghapus data kemitraan ini? Aksi ini dapat dibatalkan kembali saat basis data terhubung secara penuh.
                        </p>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
}
