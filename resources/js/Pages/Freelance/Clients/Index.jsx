import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Modal from '@/Components/UI/Modal';
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
} from 'lucide-react';

export default function ClientsIndex({ clients = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Realistic sample data if not passed from controller yet
    const clientList = clients.length > 0 ? clients : [
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
                        { label: 'Semua Klien', value: 'all' },
                        { label: 'Aktif', value: 'active' },
                        { label: 'Prospek (Lead)', value: 'lead' },
                        { label: 'Nonaktif', value: 'inactive' },
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
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5">Proyek Aktif</th>
                                <th className="px-5 py-3.5 text-right">Nilai Kontrak</th>
                                <th className="px-5 py-3.5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="hover:bg-[#F9FAFB]/70 transition-colors group"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] text-[#111827] flex items-center justify-center font-semibold text-xs shrink-0">
                                                    <Building2 className="w-4 h-4 text-[#4B5563]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#111827] leading-snug">
                                                        {client.company_name}
                                                    </p>
                                                    <p className="text-xs text-[#6B7280]">
                                                        {client.contact_person}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="text-xs space-y-0.5">
                                                <p className="text-[#111827] flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                                    {client.email}
                                                </p>
                                                <p className="text-[#6B7280] flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                                    {client.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
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
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    type="button"
                                                    className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                    title="Edit Klien"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
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
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            Simpan Klien
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input
                        label="Nama Perusahaan"
                        placeholder="Contoh: PT Teknologi Bangsa"
                        required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Nama Kontak Utama"
                            placeholder="Contoh: Ahmad Fauzi"
                            required
                        />
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Status Kemitraan
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]">
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
                            required
                        />
                        <Input
                            label="Nomor Telepon / WhatsApp"
                            placeholder="+62 812-xxxx-xxxx"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Catatan Tambahan
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Catatan scope kemitraan atau preferensi komunikasi..."
                            className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                        />
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}

