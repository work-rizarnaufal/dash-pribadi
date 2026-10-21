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
    FolderKanban,
    Building2,
    Calendar,
    Clock,
    AlertTriangle,
    ShieldCheck,
    Receipt,
    RefreshCw,
    CheckCircle2,
    SlidersHorizontal,
    MoreHorizontal,
    ArrowUpRight,
    Wrench,
    Eye,
    Trash2,
    Edit2,
    Sparkles,
    Globe,
    Server,
    ExternalLink,
    CreditCard,
    DollarSign,
} from 'lucide-react';
import { router } from '@inertiajs/react';

const INITIAL_PROJECTS = [
    {
        id: 1,
        name: 'Redesign Portal Korporat Digital & Payment Gateway',
        client: 'PT Sinarmas Telco Digital',
        type: 'development',
        status: 'in_progress',
        progress: 75,
        start_date: '01 Agu 2026',
        end_date: '15 Nov 2026',
        maintenance_until: null,
        contract_value: 125000000,
        monthly_retainer: 0,
        sla_note: 'Fase staging & pengetesan API payment gateway.',
        days_remaining: 25,
        // Hosting & Domain Info
        domain_name: 'sinarmastelco.co.id',
        hosting_provider: 'AWS Lightsail (Singapore)',
        hosting_cycle: '1 Tahun',
        first_purchase_price: 1850000,
        renewal_price: 2400000,
        domain_expiry: '15 Nov 2026',
    },
    {
        id: 2,
        name: 'Maintenance & Cloud SLA Server Monitoring',
        client: 'PT Sinarmas Telco Digital',
        type: 'maintenance',
        status: 'active_maintenance',
        progress: 100,
        start_date: '01 Jan 2026',
        end_date: '31 Des 2026',
        maintenance_until: '31 Des 2026',
        contract_value: 180000000,
        monthly_retainer: 15000000,
        sla_note: 'SLA Uptime 99.9%, backup database mingguan, 20 jam tiket support/bulan.',
        days_remaining: 71,
        // Hosting & Domain Info
        domain_name: 'monitoring.sinarmastelco.id',
        hosting_provider: 'DigitalOcean Droplet 8GB',
        hosting_cycle: 'Bulanan (Auto-Renew)',
        first_purchase_price: 720000,
        renewal_price: 720000,
        domain_expiry: '31 Des 2026',
    },
    {
        id: 3,
        name: 'Desain Sistem Komponen & Token Figma UI',
        client: 'Studio Kroma Kreatif',
        type: 'development',
        status: 'in_progress',
        progress: 90,
        start_date: '10 Sep 2026',
        end_date: '30 Okt 2026',
        maintenance_until: null,
        contract_value: 45000000,
        monthly_retainer: 0,
        sla_note: 'Penyelesaian dokumentasi Storybook & handoff.',
        days_remaining: 9,
        // Hosting & Domain Info
        domain_name: 'kroma.design',
        hosting_provider: 'Vercel Pro',
        hosting_cycle: '1 Tahun',
        first_purchase_price: 350000,
        renewal_price: 450000,
        domain_expiry: '30 Okt 2026',
    },
    {
        id: 4,
        name: 'SLA Pemeliharaan Aplikasi Web E-Commerce',
        client: 'Kopi Kenari Indonesia',
        type: 'maintenance',
        status: 'renewal_due',
        progress: 100,
        start_date: '01 Nov 2025',
        end_date: '31 Okt 2026',
        maintenance_until: '31 Okt 2026',
        contract_value: 36000000,
        monthly_retainer: 3000000,
        sla_note: 'Kontrak berakhir dalam 10 hari. Proposal perpanjangan telah dikirim.',
        days_remaining: 10,
        // Hosting & Domain Info
        domain_name: 'kopikenari.com',
        hosting_provider: 'Niagahoster Cloud VPS',
        hosting_cycle: '1 Tahun',
        first_purchase_price: 890000,
        renewal_price: 1850000,
        domain_expiry: '31 Okt 2026',
    },
    {
        id: 5,
        name: 'Garansi Pasca-Rilis Sistem Pelacakan Kargo',
        client: 'Aero Nusantara Logistics',
        type: 'warranty',
        status: 'warranty',
        progress: 100,
        start_date: '01 Okt 2026',
        end_date: '30 Nov 2026',
        maintenance_until: '30 Nov 2026',
        contract_value: 68000000,
        monthly_retainer: 0,
        sla_note: 'Masa garansi perbaikan bug kritis 60 hari tanpa biaya tambahan.',
        days_remaining: 40,
        // Hosting & Domain Info
        domain_name: 'track.aeronusantara.id',
        hosting_provider: 'DomaiNesia Dedicated Cloud',
        hosting_cycle: '2 Tahun',
        first_purchase_price: 1450000,
        renewal_price: 2600000,
        domain_expiry: '30 Nov 2026',
    },
    {
        id: 6,
        name: 'SLA Retainer Pemeliharaan Website Brand',
        client: 'Studio Kroma Kreatif',
        type: 'maintenance',
        status: 'active_maintenance',
        progress: 100,
        start_date: '01 Jun 2026',
        end_date: '31 Mei 2027',
        maintenance_until: '31 Mei 2027',
        contract_value: 60000000,
        monthly_retainer: 5000000,
        sla_note: 'Monitoring SEO mingguan, update konten blog, optimasi Core Web Vitals.',
        days_remaining: 222,
        // Hosting & Domain Info
        domain_name: 'studiokroma.id',
        hosting_provider: 'Hostinger Business Cloud',
        hosting_cycle: '1 Tahun',
        first_purchase_price: 680000,
        renewal_price: 1420000,
        domain_expiry: '31 Mei 2027',
    },
];

export default function ProjectsIndex({ initialProjects = [] }) {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'development' | 'maintenance' | 'warranty' | 'hosting'

    // Core project list state
    const [projects, setProjects] = useState(
        initialProjects.length > 0 ? initialProjects : INITIAL_PROJECTS
    );

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // New project form state with Hosting & Domain fields
    const [newProject, setNewProject] = useState({
        name: '',
        client: 'PT Sinarmas Telco Digital',
        type: 'development',
        start_date: '2026-10-21',
        end_date: '2026-12-31',
        contract_value: '',
        monthly_retainer: '',
        sla_note: '',
        domain_name: '',
        hosting_provider: 'Niagahoster Cloud VPS',
        hosting_cycle: '1 Tahun',
        first_purchase_price: '',
        renewal_price: '',
    });

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    // Dynamic calculations for KPI summary metrics
    const activeDevCount = projects.filter((p) => p.type === 'development').length;
    const activeMaintenanceCount = projects.filter((p) => p.type === 'maintenance').length;
    const totalMRR = projects
        .filter((p) => p.type === 'maintenance')
        .reduce((sum, p) => sum + (p.monthly_retainer || 0), 0);
    const renewalDueCount = projects.filter(
        (p) => p.status === 'renewal_due' || (p.type === 'maintenance' && p.days_remaining <= 30)
    ).length;
    const domainCount = projects.filter((p) => !!p.domain_name).length;

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        let matchesTab = true;
        if (activeTab === 'hosting') {
            matchesTab = !!project.domain_name;
        } else if (activeTab !== 'all') {
            matchesTab = project.type === activeTab;
        }

        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.domain_name && project.domain_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.hosting_provider && project.hosting_provider.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTab && matchesSearch;
    });

    // 1. Create project handler
    const handleCreateProject = (e) => {
        if (e) e.preventDefault();
        if (!newProject.name.trim()) {
            toast.error('Mohon isi nama proyek atau kontrak.');
            return;
        }

        const isMaint = newProject.type === 'maintenance';
        const created = {
            id: Date.now(),
            name: newProject.name.trim(),
            client: newProject.client,
            type: newProject.type,
            status: isMaint ? 'active_maintenance' : 'in_progress',
            progress: isMaint ? 100 : 10,
            start_date: newProject.start_date,
            end_date: newProject.end_date,
            maintenance_until: isMaint ? newProject.end_date : null,
            contract_value: Number(newProject.contract_value) || 0,
            monthly_retainer: isMaint ? Number(newProject.monthly_retainer) || 0 : 0,
            sla_note: newProject.sla_note.trim() || 'Cakupan pengerjaan deliverables proyek.',
            days_remaining: 60,
            // Hosting & domain attributes
            domain_name: newProject.domain_name.trim() || null,
            hosting_provider: newProject.hosting_provider || 'Niagahoster Cloud VPS',
            hosting_cycle: newProject.hosting_cycle || '1 Tahun',
            first_purchase_price: Number(newProject.first_purchase_price) || 0,
            renewal_price: Number(newProject.renewal_price) || 0,
            domain_expiry: newProject.end_date,
        };

        setProjects([created, ...projects]);
        setIsAddModalOpen(false);
        setNewProject({
            name: '',
            client: 'PT Sinarmas Telco Digital',
            type: 'development',
            start_date: '2026-10-21',
            end_date: '2026-12-31',
            contract_value: '',
            monthly_retainer: '',
            sla_note: '',
            domain_name: '',
            hosting_provider: 'Niagahoster Cloud VPS',
            hosting_cycle: '1 Tahun',
            first_purchase_price: '',
            renewal_price: '',
        });
        toast.success(`Proyek & Aset Hosting "${created.name}" berhasil didaftarkan!`);
    };

    // 2. Interactive SLA extension
    const handleExtendDays = (projectId, daysToAdd, label) => {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId) {
                    const updatedDays = (p.days_remaining || 0) + daysToAdd;
                    return {
                        ...p,
                        days_remaining: updatedDays,
                        status: 'active_maintenance',
                        maintenance_until: `+${updatedDays} hari mendatang`,
                        domain_expiry: `+${updatedDays} hari mendatang`,
                    };
                }
                return p;
            })
        );

        if (selectedProject && selectedProject.id === projectId) {
            const updatedDays = (selectedProject.days_remaining || 0) + daysToAdd;
            setSelectedProject({
                ...selectedProject,
                days_remaining: updatedDays,
                status: 'active_maintenance',
                maintenance_until: `+${updatedDays} hari mendatang`,
                domain_expiry: `+${updatedDays} hari mendatang`,
            });
        }

        toast.success(`Masa berlaku SLA & Hosting diperpanjang ${label} (+${daysToAdd} hari)!`);
    };

    // 3. Interactive progress slider / preset update
    const handleUpdateProgress = (projectId, newProgress) => {
        const clamped = Math.min(100, Math.max(0, newProgress));
        setProjects((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, progress: clamped } : p))
        );
        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject({ ...selectedProject, progress: clamped });
        }
    };

    // 4. Interactive project status update
    const handleUpdateStatus = (projectId, newStatus) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
        );
        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject({ ...selectedProject, status: newStatus });
        }
        toast.success('Status operasional proyek / SLA berhasil diperbarui!');
    };

    // 5. Send retainer invoice handler
    const handleSendInvoice = (name, amount) => {
        toast.success(
            `Invoice tagihan retainer ${formatIDR(amount)} untuk "${name}" berhasil diterbitkan!`
        );
    };

    // 6. Send renewal invoice to client handler
    const handleBillHostingRenewal = (project) => {
        const renewalAmount = project.renewal_price || project.monthly_retainer || 1500000;
        toast.success(
            `Faktur tagihan renewal hosting & domain (${formatIDR(renewalAmount)}) disiapkan untuk klien "${project.client}"!`
        );
        router.visit('/invoices');
    };

    // 7. Delete project handler
    const handleConfirmDelete = () => {
        if (!projectToDelete) return;
        const name = projectToDelete.name;
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
        if (selectedProject && selectedProject.id === projectToDelete.id) {
            setSelectedProject(null);
        }
        setProjectToDelete(null);
        toast.success(`Proyek & Aset "${name}" telah dihapus.`);
    };

    const renderTypeBadge = (type) => {
        switch (type) {
            case 'development':
                return <Badge variant="outline">Pengerjaan Dev</Badge>;
            case 'maintenance':
                return <Badge variant="growth">Retainer SLA</Badge>;
            case 'warranty':
                return <Badge variant="secondary">Garansi Rilis</Badge>;
            default:
                return <Badge variant="outline">{type}</Badge>;
        }
    };

    const renderStatusBadge = (status, daysRemaining) => {
        if (status === 'renewal_due' || (status === 'active_maintenance' && daysRemaining <= 30)) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                    <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                    Renewal Segera
                </span>
            );
        }
        if (status === 'active_maintenance') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                    <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                    SLA Aktif
                </span>
            );
        }
        if (status === 'in_progress') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB]">
                    <Clock className="w-3 h-3 text-[#6B7280]" />
                    Pengerjaan
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB]">
                <CheckCircle2 className="w-3 h-3 text-[#9CA3AF]" />
                Garansi Aktif
            </span>
        );
    };

    return (
        <AppLayout
            title="Proyek & Maintenance"
            subtitle="Pantau siklus pengembangan aktif, tenggat rilis deliverables, serta aset hosting dan domain kemitraan."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Plus}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Tambah Proyek / SLA
                </Button>
            }
        >
            <div className="space-y-6">
                {/* 1. Metric KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Proyek Dev Aktif */}
                    <Card className="p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                                Proyek Pengerjaan
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#111827]">
                                <FolderKanban className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="font-metric text-2xl font-bold text-[#111827]">
                                {activeDevCount} Proyek
                            </div>
                            <span className="text-xs text-[#6B7280] mt-0.5 block">
                                Deliverables aktif berjalan
                            </span>
                        </div>
                    </Card>

                    {/* Kontrak Maintenance Aktif */}
                    <Card className="p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                                Kontrak Maintenance
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="font-metric text-2xl font-bold text-[#111827]">
                                {activeMaintenanceCount} Klien SLA
                            </div>
                            <span className="text-xs text-[#10B981] mt-0.5 block font-medium">
                                Uptime & bug fixing terjaga
                            </span>
                        </div>
                    </Card>

                    {/* Estimasi MRR Maintenance */}
                    <Card className="p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                                Pendapatan Retainer (MRR)
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#111827]">
                                <Receipt className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="font-metric text-2xl font-bold text-[#111827] tabular-nums">
                                {formatIDR(totalMRR)}
                            </div>
                            <span className="text-xs text-[#6B7280] mt-0.5 block">
                                Recurring rutin tiap bulan
                            </span>
                        </div>
                    </Card>

                    {/* Alert Renewal Kontrak & Domain */}
                    <Card
                        className={`p-5 flex flex-col justify-between border ${
                            renewalDueCount > 0
                                ? 'bg-[#FFFBEB]/40 border-[#FDE68A]'
                                : 'border-[#E5E7EB]'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
                                Perlu Perpanjangan (SLA / Domain)
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                                <AlertTriangle className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="font-metric text-2xl font-bold text-[#92400E]">
                                {renewalDueCount} Aset
                            </div>
                            <span className="text-xs text-[#B45309] mt-0.5 block font-medium">
                                Jatuh tempo dalam &lt;30 hari
                            </span>
                        </div>
                    </Card>
                </div>

                {/* 2. Controls Bar (Tabs & Search) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Filter Tabs including Dedicated Hosting & Domain Tab */}
                    <div className="flex items-center gap-1 bg-[#F3F4F6] p-1 rounded-xl overflow-x-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                                activeTab === 'all'
                                    ? 'bg-white text-[#111827] shadow-xs'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            Semua ({projects.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('development')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                                activeTab === 'development'
                                    ? 'bg-white text-[#111827] shadow-xs'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            Pengerjaan Dev ({activeDevCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('maintenance')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                                activeTab === 'maintenance'
                                    ? 'bg-white text-[#111827] shadow-xs'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            Kontrak Maintenance ({activeMaintenanceCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('warranty')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                                activeTab === 'warranty'
                                    ? 'bg-white text-[#111827] shadow-xs'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            Garansi Rilis ({projects.filter((p) => p.type === 'warranty').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('hosting')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                                activeTab === 'hosting'
                                    ? 'bg-[#111827] text-white shadow-xs'
                                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-white/50'
                            }`}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Hosting & Domain ({domainCount})</span>
                        </button>
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari proyek, domain, atau hosting..."
                            className="block w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E7EB] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] rounded-lg focus:outline-none placeholder-[#9CA3AF]"
                        />
                    </div>
                </div>

                {/* 3. Table: Conditionally rendered based on activeTab */}
                {activeTab === 'hosting' ? (
                    /* DEDICATED HOSTING & DOMAIN ASSETS TABLE */
                    <Card noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]/75 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                        <th className="px-5 py-3.5">Nama Domain & Proyek</th>
                                        <th className="px-5 py-3.5">Provider Hosting</th>
                                        <th className="px-5 py-3.5">Siklus Paket</th>
                                        <th className="px-5 py-3.5">Jatuh Tempo Renewal</th>
                                        <th className="px-5 py-3.5 text-right">Beli Awal</th>
                                        <th className="px-5 py-3.5 text-right">Biaya Renewal</th>
                                        <th className="px-5 py-3.5 text-center">Aksi Aset</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3F4F6] text-xs">
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((project) => (
                                            <tr
                                                key={project.id}
                                                onClick={() => setSelectedProject(project)}
                                                className="hover:bg-[#F9FAFB]/80 transition-colors group cursor-pointer"
                                            >
                                                {/* Domain Name & Link */}
                                                <td className="px-5 py-4 max-w-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-[#111827] shrink-0" />
                                                        <span className="font-bold text-[#111827] text-sm group-hover:underline">
                                                            {project.domain_name}
                                                        </span>
                                                        <a
                                                            href={`https://${project.domain_name}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-[#9CA3AF] hover:text-[#111827]"
                                                            title="Kunjungi website"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                    <p className="text-[11px] text-[#6B7280] mt-0.5 truncate">
                                                        {project.name} • <span className="font-medium text-[#111827]">{project.client}</span>
                                                    </p>
                                                </td>

                                                {/* Hosting Provider */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 font-medium text-[#111827]">
                                                        <Server className="w-3.5 h-3.5 text-[#4B5563]" />
                                                        <span>{project.hosting_provider || 'Server Cloud'}</span>
                                                    </div>
                                                </td>

                                                {/* Package Duration Cycle */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] font-medium text-[11px] text-[#4B5563]">
                                                        {project.hosting_cycle || '1 Tahun'}
                                                    </span>
                                                </td>

                                                {/* Expiry Date & Remaining Days Alert */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-[#111827]">
                                                        {project.domain_expiry || project.end_date}
                                                    </div>
                                                    <div className="text-[11px] mt-0.5">
                                                        {project.days_remaining <= 30 ? (
                                                            <span className="text-[#EF4444] font-bold inline-flex items-center gap-1">
                                                                <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                                                                Sisa {project.days_remaining} hari
                                                            </span>
                                                        ) : (
                                                            <span className="text-[#6B7280]">
                                                                Sisa {project.days_remaining} hari
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* First Purchase Price */}
                                                <td className="px-5 py-4 text-right whitespace-nowrap">
                                                    <span className="font-metric text-[#6B7280] tabular-nums">
                                                        {formatIDR(project.first_purchase_price || 0)}
                                                    </span>
                                                </td>

                                                {/* Renewal Price */}
                                                <td className="px-5 py-4 text-right whitespace-nowrap">
                                                    <div className="font-metric font-bold text-[#111827] text-sm tabular-nums">
                                                        {formatIDR(project.renewal_price || 0)}
                                                    </div>
                                                    {project.renewal_price > project.first_purchase_price && (
                                                        <span className="text-[10px] text-[#B45309] block">
                                                            +{formatIDR(project.renewal_price - project.first_purchase_price)} pasca promo
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleBillHostingRenewal(project)}
                                                            className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                            title="Terbitkan Tagihan Renewal ke Klien"
                                                        >
                                                            <Receipt className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleExtendDays(project.id, 365, '1 Tahun')}
                                                            className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                            title="Catat Perpanjangan Hosting (+1 Tahun)"
                                                        >
                                                            <RefreshCw className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedProject(project)}
                                                            className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                            title="Lihat Detail Lengkap"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-5 py-12 text-center text-[#9CA3AF]">
                                                Belum ada aset domain atau hosting yang terdaftar dalam proyek.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ) : (
                    /* STANDARD DELIVERABLES & MAINTENANCE TABLE */
                    <Card noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]/75 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                        <th className="px-5 py-3.5">Proyek & Klien</th>
                                        <th className="px-5 py-3.5">Klasifikasi</th>
                                        <th className="px-5 py-3.5">Fase & Status</th>
                                        <th className="px-5 py-3.5">Masa Berlaku / Due</th>
                                        <th className="px-5 py-3.5 text-right">Nilai / Retainer</th>
                                        <th className="px-5 py-3.5 text-center">Aksi Cepat</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3F4F6] text-xs">
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((project) => (
                                            <tr
                                                key={project.id}
                                                onClick={() => setSelectedProject(project)}
                                                className="hover:bg-[#F9FAFB]/80 transition-colors group cursor-pointer"
                                            >
                                                {/* Project Name & Client */}
                                                <td className="px-5 py-4 max-w-sm">
                                                    <div className="font-semibold text-[#111827] text-sm leading-snug group-hover:underline">
                                                        {project.name}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#6B7280] text-xs mt-1">
                                                        <div className="flex items-center gap-1">
                                                            <Building2 className="w-3.5 h-3.5 shrink-0 text-[#9CA3AF]" />
                                                            <span>{project.client}</span>
                                                        </div>
                                                        {project.domain_name && (
                                                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#4B5563] bg-[#F3F4F6] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                                                                <Globe className="w-2.5 h-2.5 text-[#6B7280]" />
                                                                {project.domain_name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {project.sla_note && (
                                                        <p className="text-[11px] text-[#9CA3AF] mt-1 line-clamp-1 italic">
                                                            "{project.sla_note}"
                                                        </p>
                                                    )}
                                                </td>

                                                {/* Classification Badge */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    {renderTypeBadge(project.type)}
                                                </td>

                                                {/* Phase & Status */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="space-y-1.5">
                                                        {renderStatusBadge(project.status, project.days_remaining)}
                                                        {project.type === 'development' && (
                                                            <div className="w-28 space-y-1">
                                                                <div className="flex justify-between text-[10px] text-[#6B7280]">
                                                                    <span>Progres</span>
                                                                    <span className="font-semibold">{project.progress}%</span>
                                                                </div>
                                                                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="bg-[#111827] h-full rounded-full transition-all duration-300"
                                                                        style={{ width: `${project.progress}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Validity / Due Date */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="text-[#111827] font-medium">
                                                        {project.maintenance_until || project.end_date}
                                                    </div>
                                                    <div className="text-[11px] text-[#6B7280] flex items-center gap-1 mt-0.5">
                                                        <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                                                        {project.days_remaining <= 30 && project.type === 'maintenance' ? (
                                                            <span className="text-[#EF4444] font-semibold">
                                                                Sisa {project.days_remaining} hari
                                                            </span>
                                                        ) : (
                                                            <span>Sisa {project.days_remaining} hari</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Contract Value / Retainer */}
                                                <td className="px-5 py-4 text-right whitespace-nowrap">
                                                    {project.type === 'maintenance' ? (
                                                        <div>
                                                            <div className="font-metric font-bold text-[#111827] text-sm">
                                                                {formatIDR(project.monthly_retainer)}
                                                                <span className="text-[10px] font-normal text-[#6B7280]">
                                                                    /bln
                                                                </span>
                                                            </div>
                                                            <span className="text-[10px] text-[#9CA3AF] tabular-nums block">
                                                                Total: {formatIDR(project.contract_value)}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="font-metric font-bold text-[#111827] text-sm">
                                                            {formatIDR(project.contract_value)}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedProject(project)}
                                                            className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                            title="Lihat Detail & Aksi Proyek"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                        {project.type === 'maintenance' && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleSendInvoice(project.name, project.monthly_retainer)
                                                                    }
                                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                                    title="Terbitkan Tagihan Retainer Bulanan"
                                                                >
                                                                    <Receipt className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleExtendDays(project.id, 90, '3 Bulan')}
                                                                    className="p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                                                                    title="Perpanjang Kontrak SLA (+90 Hari)"
                                                                >
                                                                    <RefreshCw className="w-3.5 h-3.5" />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => setProjectToDelete(project)}
                                                            className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                                                            title="Hapus / Arsipkan Proyek"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-5 py-12 text-center text-[#9CA3AF]">
                                                Tidak ada proyek atau kontrak yang sesuai dengan kriteria filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>

            {/* Modal Detail & Aksi Interaktif Proyek / SLA / Hosting */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.name || 'Detail Proyek'}
                subtitle={`Klien: ${selectedProject?.client || ''} • Tipe: ${selectedProject?.type?.toUpperCase() || ''}`}
                maxWidth="max-w-2xl"
                footer={
                    <>
                        <div className="flex items-center justify-between w-full">
                            <Button
                                variant="danger"
                                size="sm"
                                leftIcon={Trash2}
                                onClick={() => setProjectToDelete(selectedProject)}
                            >
                                Hapus Proyek
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    Tutup
                                </Button>
                                {selectedProject?.domain_name && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        leftIcon={Receipt}
                                        onClick={() => handleBillHostingRenewal(selectedProject)}
                                    >
                                        Tagih Renewal Hosting
                                    </Button>
                                )}
                                {selectedProject?.type === 'maintenance' && !selectedProject?.domain_name && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        leftIcon={Receipt}
                                        onClick={() => {
                                            handleSendInvoice(
                                                selectedProject.name,
                                                selectedProject.monthly_retainer
                                            );
                                        }}
                                    >
                                        Terbitkan Tagihan Retainer
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                }
            >
                {selectedProject && (
                    <div className="space-y-5 text-xs text-[#111827]">
                        {/* Status & Contract Type Card */}
                        <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
                                        Status Operasional & Fase
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {renderTypeBadge(selectedProject.type)}
                                        {renderStatusBadge(
                                            selectedProject.status,
                                            selectedProject.days_remaining
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">
                                        Masa Berlaku
                                    </span>
                                    <span className="font-semibold text-xs text-[#111827]">
                                        {selectedProject.maintenance_until || selectedProject.end_date}
                                    </span>
                                </div>
                            </div>

                            {/* Ubah Status Dropdown */}
                            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                                <span className="font-semibold text-[#6B7280]">
                                    Ubah Status Proyek:
                                </span>
                                <select
                                    value={selectedProject.status}
                                    onChange={(e) =>
                                        handleUpdateStatus(selectedProject.id, e.target.value)
                                    }
                                    className="bg-white border border-[#E5E7EB] rounded-lg text-xs py-1.5 px-3 font-medium text-[#111827] focus:ring-1 focus:ring-[#111827]"
                                >
                                    <option value="in_progress">Pengerjaan Dev (In Progress)</option>
                                    <option value="active_maintenance">Retainer SLA Aktif</option>
                                    <option value="renewal_due">Perlu Renewal (&lt;30 Hari)</option>
                                    <option value="warranty">Garansi Pasca-Rilis</option>
                                    <option value="completed">Selesai (Completed)</option>
                                </select>
                            </div>
                        </div>

                        {/* SPESIFIKASI HOSTING & DOMAIN CARD */}
                        {selectedProject.domain_name && (
                            <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3.5">
                                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#111827]">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-sm text-[#111827] flex items-center gap-1.5">
                                                {selectedProject.domain_name}
                                                <a
                                                    href={`https://${selectedProject.domain_name}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#9CA3AF] hover:text-[#111827]"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </span>
                                            <span className="text-[11px] text-[#6B7280]">
                                                Provider: <span className="font-semibold text-[#111827]">{selectedProject.hosting_provider}</span> ({selectedProject.hosting_cycle})
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#111827]">
                                        Sisa {selectedProject.days_remaining} hari
                                    </span>
                                </div>

                                {/* Comparison Grid: First Purchase vs Renewal Cost */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                                        <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                            Harga Pembelian Pertama
                                        </span>
                                        <div className="font-metric font-bold text-sm text-[#4B5563] tabular-nums">
                                            {formatIDR(selectedProject.first_purchase_price || 0)}
                                        </div>
                                        <span className="text-[10px] text-[#9CA3AF]">Biaya setup / promo awal</span>
                                    </div>
                                    <div className="p-3 bg-white border border-[#111827]/20 rounded-lg shadow-2xs">
                                        <span className="text-[10px] uppercase font-bold text-[#111827] tracking-wider block mb-1">
                                            Harga Renewal Normal
                                        </span>
                                        <div className="font-metric font-bold text-sm text-[#111827] tabular-nums">
                                            {formatIDR(selectedProject.renewal_price || 0)}
                                        </div>
                                        <span className="text-[10px] text-[#D97706] font-medium">Estimasi tagihan perpanjangan</span>
                                    </div>
                                </div>

                                {/* Action Buttons for Hosting */}
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-[11px] text-[#6B7280]">Perpanjang siklus hosting:</span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleExtendDays(selectedProject.id, 365, '1 Tahun')}
                                            className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#111827] hover:text-white transition-colors text-[11px] font-semibold text-[#4B5563]"
                                        >
                                            +1 Tahun
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleExtendDays(selectedProject.id, 730, '2 Tahun')}
                                            className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#111827] hover:text-white transition-colors text-[11px] font-semibold text-[#4B5563]"
                                        >
                                            +2 Tahun
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Development Progress Control (For Dev Projects) */}
                        {selectedProject.type === 'development' && (
                            <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold uppercase tracking-wider text-[10px] text-[#6B7280]">
                                        Progres Pengerjaan Deliverables
                                    </span>
                                    <span className="font-metric font-bold text-sm text-[#111827]">
                                        {selectedProject.progress}% Selesai
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={selectedProject.progress}
                                    onChange={(e) =>
                                        handleUpdateProgress(
                                            selectedProject.id,
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#111827]"
                                />
                                <div className="flex items-center justify-between gap-2 pt-1">
                                    <span className="text-[11px] text-[#6B7280]">Pintasan cepat:</span>
                                    <div className="flex items-center gap-1.5">
                                        {[
                                            { label: '+10%', add: 10 },
                                            { label: '+25%', add: 25 },
                                            { label: '100% Selesai', set: 100 },
                                        ].map((p, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    const val = p.set !== undefined ? p.set : selectedProject.progress + p.add;
                                                    handleUpdateProgress(selectedProject.id, val);
                                                }}
                                                className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#111827] hover:text-white transition-colors text-[11px] font-semibold text-[#4B5563]"
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Interactive SLA Extension Buttons (For Maintenance / Warranty) */}
                        {(selectedProject.type === 'maintenance' || selectedProject.type === 'warranty') && (
                            <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold uppercase tracking-wider text-[10px] text-[#6B7280]">
                                        Perpanjangan Durasi SLA Pemeliharaan
                                    </span>
                                    <span className="text-xs font-semibold text-[#10B981]">
                                        Sisa {selectedProject.days_remaining} hari
                                    </span>
                                </div>
                                <p className="text-[#6B7280] text-xs leading-relaxed">
                                    Tambahkan durasi masa kontrak SLA secara langsung ke siklus kalender:
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleExtendDays(selectedProject.id, 30, '1 Bulan')}
                                        className="p-2.5 rounded-lg border border-[#E5E7EB] hover:border-[#111827] hover:bg-[#F9FAFB] text-center transition-all group"
                                    >
                                        <span className="block font-bold text-xs text-[#111827] group-hover:text-black">
                                            +30 Hari
                                        </span>
                                        <span className="text-[10px] text-[#6B7280]">1 Bulan</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleExtendDays(selectedProject.id, 90, '3 Bulan')}
                                        className="p-2.5 rounded-lg border border-[#E5E7EB] hover:border-[#111827] hover:bg-[#F9FAFB] text-center transition-all group"
                                    >
                                        <span className="block font-bold text-xs text-[#111827] group-hover:text-black">
                                            +90 Hari
                                        </span>
                                        <span className="text-[10px] text-[#6B7280]">1 Kuartal</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleExtendDays(selectedProject.id, 365, '1 Tahun')}
                                        className="p-2.5 rounded-lg border border-[#E5E7EB] hover:border-[#111827] hover:bg-[#F9FAFB] text-center transition-all group"
                                    >
                                        <span className="block font-bold text-xs text-[#111827] group-hover:text-black">
                                            +365 Hari
                                        </span>
                                        <span className="text-[10px] text-[#6B7280]">1 Tahun Penuh</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Contract Value & Retainer Specs */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl text-center">
                                <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                    Total Nilai Kontrak
                                </span>
                                <span className="font-metric font-bold text-sm text-[#111827]">
                                    {formatIDR(selectedProject.contract_value)}
                                </span>
                            </div>
                            <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl text-center">
                                <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-1">
                                    Retainer Bulanan
                                </span>
                                <span className="font-metric font-bold text-sm text-[#111827]">
                                    {selectedProject.monthly_retainer > 0
                                        ? `${formatIDR(selectedProject.monthly_retainer)}/bln`
                                        : 'Deliverables Tetap'}
                                </span>
                            </div>
                        </div>

                        {/* SLA Scope Notes */}
                        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
                            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#6B7280] block">
                                Cakupan SLA & Catatan Pemeliharaan
                            </span>
                            <p className="text-xs text-[#4B5563] leading-relaxed">
                                {selectedProject.sla_note || 'Tidak ada catatan khusus untuk proyek ini.'}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Tambah Proyek & Kontrak Baru dengan Input Hosting & Domain */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Pendaftaran Proyek & Kontrak Baru"
                subtitle="Daftarkan proyek baru deliverables, kontrak SLA, serta aset hosting dan domain kemitraan."
                maxWidth="max-w-2xl"
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
                            onClick={handleCreateProject}
                        >
                            Simpan Proyek & Aset
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleCreateProject} className="space-y-4">
                    <Input
                        label="Nama Proyek / Kontrak"
                        placeholder="Contoh: Redesign Mobile App & SLA Server 2026"
                        required
                        value={newProject.name}
                        onChange={(e) =>
                            setNewProject({ ...newProject, name: e.target.value })
                        }
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Klien Kemitraan
                            </label>
                            <select
                                value={newProject.client}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, client: e.target.value })
                                }
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                            >
                                <option>PT Sinarmas Telco Digital</option>
                                <option>Studio Kroma Kreatif</option>
                                <option>Aero Nusantara Logistics</option>
                                <option>Kopi Kenari Indonesia</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Tipe Kontrak
                            </label>
                            <select
                                value={newProject.type}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, type: e.target.value })
                                }
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                            >
                                <option value="development">Pengerjaan Baru (Development)</option>
                                <option value="maintenance">Retainer Pemeliharaan Berkala (Monthly SLA)</option>
                                <option value="warranty">Garansi Pasca-Rilis (Warranty Period)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Tanggal Mulai"
                            type="date"
                            required
                            value={newProject.start_date}
                            onChange={(e) =>
                                setNewProject({ ...newProject, start_date: e.target.value })
                            }
                        />
                        <Input
                            label="Tenggat Selesai / Batas Akhir SLA"
                            type="date"
                            required
                            value={newProject.end_date}
                            onChange={(e) =>
                                setNewProject({ ...newProject, end_date: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <Input
                            label="Total Nilai Kontrak (IDR)"
                            type="number"
                            placeholder="Contoh: 75000000"
                            required
                            value={newProject.contract_value}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    contract_value: e.target.value,
                                })
                            }
                        />
                        <Input
                            label="Biaya Retainer / Bulan (Jika SLA)"
                            type="number"
                            placeholder="Contoh: 5000000"
                            value={newProject.monthly_retainer}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    monthly_retainer: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* SECTION: HOSTING & DOMAIN DETAILS (NEW) */}
                    <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#111827]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                                Aset Hosting & Domain (Opsional)
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                label="Nama Domain Website"
                                placeholder="Contoh: namaklien.com"
                                value={newProject.domain_name}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, domain_name: e.target.value })
                                }
                            />
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Provider Hosting
                                </label>
                                <select
                                    value={newProject.hosting_provider}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, hosting_provider: e.target.value })
                                    }
                                    className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                >
                                    <option>Niagahoster Cloud VPS</option>
                                    <option>DomaiNesia Dedicated Cloud</option>
                                    <option>AWS Lightsail (Singapore)</option>
                                    <option>Hostinger Business Cloud</option>
                                    <option>Vercel Pro</option>
                                    <option>DigitalOcean Droplet</option>
                                    <option>Lainnya / Server Klien</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Durasi Paket
                                </label>
                                <select
                                    value={newProject.hosting_cycle}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, hosting_cycle: e.target.value })
                                    }
                                    className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                >
                                    <option>1 Tahun</option>
                                    <option>2 Tahun</option>
                                    <option>3 Tahun</option>
                                    <option>Bulanan</option>
                                </select>
                            </div>
                            <Input
                                label="Harga Beli Pertama (IDR)"
                                type="number"
                                placeholder="Contoh: 650000"
                                value={newProject.first_purchase_price}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, first_purchase_price: e.target.value })
                                }
                            />
                            <Input
                                label="Harga Renewal Normal (IDR)"
                                type="number"
                                placeholder="Contoh: 1450000"
                                value={newProject.renewal_price}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, renewal_price: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Cakupan SLA & Catatan Pemeliharaan
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Contoh: Uptime server 99.9%, backup database otomatis mingguan, kuota 15 jam perbaikan bug non-kritis per bulan..."
                            value={newProject.sla_note}
                            onChange={(e) =>
                                setNewProject({ ...newProject, sla_note: e.target.value })
                            }
                            className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                        />
                    </div>
                </form>
            </Modal>

            {/* Modal Konfirmasi Hapus Proyek */}
            <Modal
                isOpen={!!projectToDelete}
                onClose={() => setProjectToDelete(null)}
                title="Hapus Proyek / Kontrak SLA?"
                subtitle="Tindakan ini akan menghapus proyek dan menghentikan pemantauan kontrak SLA serta aset domain."
                maxWidth="max-w-md"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setProjectToDelete(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleConfirmDelete}
                        >
                            Ya, Hapus Proyek
                        </Button>
                    </>
                }
            >
                {projectToDelete && (
                    <div className="space-y-3 text-xs text-[#4B5563]">
                        <div className="flex items-center gap-3 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[#991B1B]">
                            <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">
                                    {projectToDelete.name}
                                </p>
                                <p className="text-xs text-[#B91C1C]">
                                    Klien: {projectToDelete.client} {projectToDelete.domain_name && `• Domain: ${projectToDelete.domain_name}`}
                                </p>
                            </div>
                        </div>
                        <p>
                            Apakah Anda yakin ingin menghapus proyek ini? Catatan SLA, aset domain, dan tenggat waktu tidak akan ditampilkan lagi.
                        </p>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
}
