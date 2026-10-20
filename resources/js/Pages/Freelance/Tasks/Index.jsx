import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Modal from '@/Components/UI/Modal';
import {
    Plus,
    LayoutGrid,
    Calendar as CalendarIcon,
    Clock,
    Building2,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
} from 'lucide-react';

export default function TasksIndex({ initialTasks = [] }) {
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'calendar'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Initial tasks dataset
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Audit Keamanan & Penetrasi API Gateway',
            client: 'PT Sinarmas Telco Digital',
            priority: 'high',
            status: 'todo',
            due_date: '24 Okt 2026',
        },
        {
            id: 2,
            title: 'Slicing & Refactor Desain Sistem UI Tailwind',
            client: 'Studio Kroma Kreatif',
            priority: 'medium',
            status: 'in_progress',
            due_date: '22 Okt 2026',
        },
        {
            id: 3,
            title: 'Integrasi Ekspor Invoice Format PDF',
            client: 'Internal Pulse CRM',
            priority: 'high',
            status: 'in_progress',
            due_date: '21 Okt 2026',
        },
        {
            id: 4,
            title: 'Pengujian Komprehensif Formulir Pembayaran',
            client: 'Studio Kroma Kreatif',
            priority: 'medium',
            status: 'review',
            due_date: '25 Okt 2026',
        },
        {
            id: 5,
            title: 'Setup Database Migration & Policies Auth',
            client: 'Internal Pulse CRM',
            priority: 'low',
            status: 'done',
            due_date: '20 Okt 2026',
        },
        {
            id: 6,
            title: 'Discovery Call & Briefing Scope Proyek POS',
            client: 'Aero Nusantara Logistics',
            priority: 'low',
            status: 'done',
            due_date: '19 Okt 2026',
        },
    ]);

    const columns = [
        { id: 'todo', title: 'Belum Mulai (To Do)', color: 'bg-gray-400' },
        { id: 'in_progress', title: 'Sedang Dikerjakan (In Progress)', color: 'bg-blue-500' },
        { id: 'review', title: 'Dalam Tinjauan (Review)', color: 'bg-amber-500' },
        { id: 'done', title: 'Selesai (Done)', color: 'bg-emerald-500' },
    ];

    // Simple status transition for quick UX
    const moveTask = (taskId, targetStatus) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
        );
    };

    return (
        <AppLayout
            title="Tugas & Kalender"
            subtitle="Pantau alur kerja manajemen tugas Kanban dan penanggalan jadwal tenggat waktu."
            actions={
                <div className="flex items-center gap-2">
                    {/* View Switcher Toggle */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-0.5 flex items-center shadow-xs">
                        <button
                            type="button"
                            onClick={() => setViewMode('kanban')}
                            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                viewMode === 'kanban'
                                    ? 'bg-[#111827] text-white'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Kanban</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('calendar')}
                            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                viewMode === 'calendar'
                                    ? 'bg-[#111827] text-white'
                                    : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                        >
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Kalender</span>
                        </button>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        leftIcon={Plus}
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Tugas Baru
                    </Button>
                </div>
            }
        >
            {viewMode === 'kanban' ? (
                /* Kanban Board Columns Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    {columns.map((col) => {
                        const colTasks = tasks.filter((t) => t.status === col.id);
                        return (
                            <div
                                key={col.id}
                                className="bg-[#F3F4F5] rounded-2xl p-3.5 border border-[#E5E7EB]/80 min-h-[480px] flex flex-col"
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between px-1 mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${col.color}`} />
                                        <h3 className="text-xs font-bold text-[#111827] font-display">
                                            {col.title}
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-semibold text-[#6B7280] px-1.5 py-0.5 rounded-md bg-white border border-[#E5E7EB]">
                                        {colTasks.length}
                                    </span>
                                </div>

                                {/* Task Cards */}
                                <div className="space-y-2.5 flex-1">
                                    {colTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-white rounded-xl p-3.5 border border-[#E5E7EB] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#D1D5DB] transition-all group"
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <Badge variant={task.priority} size="xs">
                                                    {task.priority.toUpperCase()}
                                                </Badge>
                                                {/* Quick Action Status Move */}
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => moveTask(task.id, e.target.value)}
                                                    className="text-[10px] bg-transparent text-[#6B7280] border-0 p-0 pr-4 focus:ring-0 cursor-pointer font-medium hover:text-[#111827]"
                                                >
                                                    <option value="todo">Pindah: To Do</option>
                                                    <option value="in_progress">Pindah: In Progress</option>
                                                    <option value="review">Pindah: Review</option>
                                                    <option value="done">Pindah: Done</option>
                                                </select>
                                            </div>

                                            <h4 className="text-xs sm:text-sm font-semibold text-[#111827] mb-2 leading-snug">
                                                {task.title}
                                            </h4>

                                            <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#F3F4F6]">
                                                <span className="truncate max-w-[120px] font-medium text-[#4B5563]">
                                                    {task.client}
                                                </span>
                                                <span className="flex items-center gap-1 shrink-0 tabular-nums">
                                                    <Clock className="w-3 h-3 text-[#9CA3AF]" />
                                                    {task.due_date}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {colTasks.length === 0 && (
                                        <div className="h-28 border-2 border-dashed border-[#E5E7EB] rounded-xl flex items-center justify-center text-xs text-[#9CA3AF]">
                                            Kosong
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Calendar View */
                <Card noPadding className="p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F3F4F6]">
                        <h3 className="font-display font-bold text-lg text-[#111827]">
                            Oktober 2026
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-[#E5E7EB] rounded-xl overflow-hidden border border-[#E5E7EB]">
                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((d) => (
                            <div
                                key={d}
                                className="bg-[#F9FAFB] p-2 text-center text-[11px] font-semibold text-[#6B7280] uppercase"
                            >
                                {d}
                            </div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => {
                            const dayNum = i + 1;
                            const matched = tasks.filter((t) => t.due_date.includes(`${dayNum} Okt`));
                            return (
                                <div
                                    key={i}
                                    className={`bg-white min-h-[90px] p-2 flex flex-col justify-between hover:bg-[#F9FAFB]/80 transition-colors ${
                                        dayNum === 20 ? 'ring-2 ring-inset ring-[#111827]' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-semibold ${
                                                dayNum === 20
                                                    ? 'w-5 h-5 rounded-full bg-[#111827] text-white flex items-center justify-center'
                                                    : 'text-[#4B5563]'
                                            }`}
                                        >
                                            {dayNum}
                                        </span>
                                    </div>
                                    <div className="space-y-1 mt-1">
                                        {matched.map((m) => (
                                            <div
                                                key={m.id}
                                                className="text-[10px] p-1 rounded bg-[#F3F4F6] text-[#111827] font-medium truncate"
                                                title={m.title}
                                            >
                                                {m.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* Modal Tambah Tugas Baru */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Tambah Tugas Baru"
                subtitle="Tentukan target pekerjaan, hubungkan dengan klien, dan tetapkan tenggat waktu."
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
                            Buat Tugas
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input
                        label="Judul Tugas"
                        placeholder="Contoh: Slicing Halaman Invoice & Export PDF"
                        required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Hubungkan Klien
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]">
                                <option>PT Sinarmas Telco Digital</option>
                                <option>Studio Kroma Kreatif</option>
                                <option>Aero Nusantara Logistics</option>
                                <option>Internal Pulse CRM</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Prioritas
                            </label>
                            <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]">
                                <option value="low">Rendah (Low)</option>
                                <option value="medium">Menengah (Medium)</option>
                                <option value="high">Tinggi (High)</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label="Tenggat Waktu (Due Date)"
                        type="date"
                        required
                    />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Deskripsi Rincian Tugas
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Deliverables, kriteria penerimaan, atau catatan teknis..."
                            className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                        />
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}

