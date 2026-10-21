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
    LayoutGrid,
    Calendar as CalendarIcon,
    Clock,
    Building2,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    GripVertical,
    Trash2,
    Check,
    CheckSquare,
    Eye,
} from 'lucide-react';

export default function TasksIndex({ initialTasks = [] }) {
    const { toast } = useToast();
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'calendar'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Form states for creating tasks
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskClient, setNewTaskClient] = useState('PT Sinarmas Telco Digital');
    const [newTaskPriority, setNewTaskPriority] = useState('medium');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');

    // Calendar month navigation
    const MONTH_LABELS = ['September 2026', 'Oktober 2026', 'November 2026'];
    const [monthIdx, setMonthIdx] = useState(1); // Default to 'Oktober 2026'

    // Drag and drop states
    const [draggedTaskId, setDraggedTaskId] = useState(null);
    const [dragOverCol, setDragOverCol] = useState(null);

    // Initial tasks dataset
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Audit Keamanan & Penetrasi API Gateway',
            client: 'PT Sinarmas Telco Digital',
            priority: 'high',
            status: 'todo',
            due_date: '24 Okt 2026',
            description: 'Uji celah enkripsi token JWT, validasi rate limiting, dan proteksi SQL Injection pada endpoint transaksi.',
        },
        {
            id: 2,
            title: 'Slicing & Refactor Desain Sistem UI Tailwind',
            client: 'Studio Kroma Kreatif',
            priority: 'medium',
            status: 'in_progress',
            due_date: '22 Okt 2026',
            description: 'Migrasi komponen tombol, modal, dan badge agar sesuai aturan Swiss Neo-Minimalism.',
        },
        {
            id: 3,
            title: 'Integrasi Ekspor Invoice Format PDF',
            client: 'Internal Pulse CRM',
            priority: 'high',
            status: 'in_progress',
            due_date: '21 Okt 2026',
            description: 'Implementasi print stylesheet dan download biner dokumen faktur penagihan.',
        },
        {
            id: 4,
            title: 'Pengujian Komprehensif Formulir Pembayaran',
            client: 'Studio Kroma Kreatif',
            priority: 'medium',
            status: 'review',
            due_date: '25 Okt 2026',
            description: 'Verifikasi validasi sisi klien dan pesan error toast saat data tidak lengkap.',
        },
        {
            id: 5,
            title: 'Setup Database Migration & Policies Auth',
            client: 'Internal Pulse CRM',
            priority: 'low',
            status: 'done',
            due_date: '20 Okt 2026',
            description: 'Konfigurasi skema database tabel users, clients, dan projects.',
        },
        {
            id: 6,
            title: 'Discovery Call & Briefing Scope Proyek POS',
            client: 'Aero Nusantara Logistics',
            priority: 'low',
            status: 'done',
            due_date: '19 Okt 2026',
            description: 'Wawancara kebutuhan modul inventori dan integrasi resi barcode kargo.',
        },
    ]);

    const columns = [
        { id: 'todo', title: 'Belum Mulai (To Do)', color: 'bg-gray-400' },
        { id: 'in_progress', title: 'Sedang Dikerjakan (In Progress)', color: 'bg-blue-500' },
        { id: 'review', title: 'Dalam Tinjauan (Review)', color: 'bg-amber-500' },
        { id: 'done', title: 'Selesai (Done)', color: 'bg-emerald-500' },
    ];

    // HTML5 Drag and Drop handlers
    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId.toString());
        e.dataTransfer.effectAllowed = 'move';
        setDraggedTaskId(taskId);
    };

    const handleDragOver = (e, colId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverCol !== colId) {
            setDragOverCol(colId);
        }
    };

    const handleDragLeave = (e, colId) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setDragOverCol(null);
    };

    const handleDrop = (e, targetColId) => {
        e.preventDefault();
        setDragOverCol(null);
        const taskIdStr = e.dataTransfer.getData('text/plain');
        const taskId = Number(taskIdStr);
        if (!taskId) return;

        const task = tasks.find((t) => t.id === taskId);
        if (task && task.status !== targetColId) {
            setTasks((prev) =>
                prev.map((t) => (t.id === taskId ? { ...t, status: targetColId } : t))
            );
            const targetCol = columns.find((c) => c.id === targetColId);
            const cleanTitle = targetCol?.title.split('(')[0].trim() || targetColId;
            toast.success(`Tugas dipindahkan ke "${cleanTitle}"`);
        }
        setDraggedTaskId(null);
    };

    // Quick complete check
    const handleToggleDone = (e, taskId) => {
        e.stopPropagation();
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        const newStatus = task.status === 'done' ? 'todo' : 'done';
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        );
        if (newStatus === 'done') {
            toast.success(`Tugas "${task.title.slice(0, 30)}..." ditandai selesai!`);
        } else {
            toast.info(`Status tugas dikembalikan ke To Do`);
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        if (selectedTask?.id === taskId) setSelectedTask(null);
        toast.info('Tugas telah dihapus.');
    };

    const handleCreateTask = (e) => {
        if (e) e.preventDefault();
        if (!newTaskTitle.trim()) {
            toast.error('Judul tugas wajib diisi!');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            client: newTaskClient,
            priority: newTaskPriority,
            status: 'todo',
            due_date: newTaskDueDate || '28 Okt 2026',
            description: newTaskDesc || 'Rincian target pengerjaan tugas.',
        };

        setTasks((prev) => [newTask, ...prev]);
        setIsAddModalOpen(false);
        setNewTaskTitle('');
        setNewTaskDesc('');
        toast.success('Tugas baru berhasil didaftarkan ke Kanban board!');
    };

    return (
        <AppLayout
            title="Tugas & Kalender"
            subtitle="Pantau alur kerja manajemen tugas Kanban (dukungan drag and drop) dan jadwal kalender penanggalan."
            actions={
                <div className="flex items-center gap-2">
                    {/* View Switcher Toggle */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-0.5 flex items-center shadow-xs">
                        <button
                            type="button"
                            onClick={() => setViewMode('kanban')}
                            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                viewMode === 'kanban'
                                    ? 'bg-[#111827] text-white shadow-xs'
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
                                    ? 'bg-[#111827] text-white shadow-xs'
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
                /* Kanban Board Columns Grid with Drag and Drop */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    {columns.map((col) => {
                        const colTasks = tasks.filter((t) => t.status === col.id);
                        const isOver = dragOverCol === col.id;

                        return (
                            <div
                                key={col.id}
                                onDragOver={(e) => handleDragOver(e, col.id)}
                                onDragLeave={(e) => handleDragLeave(e, col.id)}
                                onDrop={(e) => handleDrop(e, col.id)}
                                className={`rounded-2xl p-3.5 border transition-all duration-200 min-h-[520px] flex flex-col ${
                                    isOver
                                        ? 'bg-[#EBF1F6] border-[#111827]/40 ring-2 ring-[#111827]/10'
                                        : 'bg-[#F3F4F5] border-[#E5E7EB]/80'
                                }`}
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

                                {/* Task Cards Area */}
                                <div className="space-y-2.5 flex-1">
                                    {colTasks.map((task) => {
                                        const isDragging = draggedTaskId === task.id;

                                        return (
                                            <div
                                                key={task.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task.id)}
                                                onClick={() => setSelectedTask(task)}
                                                className={`bg-white rounded-xl p-3.5 border border-[#E5E7EB] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#111827]/40 transition-all cursor-grab active:cursor-grabbing group select-none ${
                                                    isDragging
                                                        ? 'opacity-40 scale-95 ring-2 ring-[#111827]/20 border-dashed'
                                                        : 'hover:shadow-md'
                                                }`}
                                            >
                                                {/* Card Header & Controls */}
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <GripVertical className="w-3.5 h-3.5 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <Badge variant={task.priority} size="xs">
                                                            {task.priority.toUpperCase()}
                                                        </Badge>
                                                    </div>

                                                    {/* Quick Complete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleToggleDone(e, task.id)}
                                                        className={`p-1 rounded-md transition-colors ${
                                                            task.status === 'done'
                                                                ? 'text-[#10B981] bg-[#ECFDF5]'
                                                                : 'text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6]'
                                                        }`}
                                                        title={task.status === 'done' ? 'Tandai belum selesai' : 'Tandai selesai'}
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <h4 className="text-xs sm:text-sm font-semibold text-[#111827] mb-2 leading-snug">
                                                    {task.title}
                                                </h4>

                                                <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#F3F4F6]">
                                                    <span className="truncate max-w-[130px] font-medium text-[#4B5563]">
                                                        {task.client}
                                                    </span>
                                                    <span className="flex items-center gap-1 shrink-0 tabular-nums">
                                                        <Clock className="w-3 h-3 text-[#9CA3AF]" />
                                                        {task.due_date}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {colTasks.length === 0 && (
                                        <div className="h-28 border-2 border-dashed border-[#E5E7EB] rounded-xl flex items-center justify-center text-xs text-[#9CA3AF]">
                                            Tarik kartu ke sini
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Interactive Calendar View */
                <Card noPadding className="p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F3F4F6]">
                        <h3 className="font-display font-bold text-lg text-[#111827]">
                            {MONTH_LABELS[monthIdx]}
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setMonthIdx((prev) => Math.max(0, prev - 1))}
                                disabled={monthIdx === 0}
                                className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                title="Bulan Sebelumnya"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMonthIdx((prev) => Math.min(MONTH_LABELS.length - 1, prev + 1))}
                                disabled={monthIdx === MONTH_LABELS.length - 1}
                                className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                title="Bulan Berikutnya"
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
                            const isToday = dayNum === 21 && monthIdx === 1;

                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setNewTaskDueDate(`${dayNum} Okt 2026`);
                                        setIsAddModalOpen(true);
                                    }}
                                    className={`bg-white min-h-[96px] p-2 flex flex-col justify-between hover:bg-[#F9FAFB] transition-colors cursor-pointer group ${
                                        isToday ? 'ring-2 ring-inset ring-[#111827]' : ''
                                    }`}
                                    title={`Klik untuk tambah tugas di ${dayNum} Okt`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-semibold ${
                                                isToday
                                                    ? 'w-5 h-5 rounded-full bg-[#111827] text-white flex items-center justify-center text-[11px]'
                                                    : 'text-[#4B5563]'
                                            }`}
                                        >
                                            {dayNum}
                                        </span>
                                        <span className="text-[10px] text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity">
                                            +
                                        </span>
                                    </div>
                                    <div className="space-y-1 mt-1">
                                        {matched.map((m) => (
                                            <div
                                                key={m.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedTask(m);
                                                }}
                                                className="text-[10px] p-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] font-medium truncate transition-colors flex items-center gap-1"
                                                title={m.title}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                                        m.status === 'done' ? 'bg-[#10B981]' : 'bg-[#111827]'
                                                    }`}
                                                />
                                                <span className="truncate">{m.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* Modal Detail / Sunting Tugas */}
            <Modal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                title={selectedTask?.title || 'Detail Tugas'}
                subtitle={`Klien: ${selectedTask?.client || ''}`}
                maxWidth="max-w-xl"
                footer={
                    <>
                        <Button
                            variant="danger"
                            size="sm"
                            leftIcon={Trash2}
                            onClick={() => handleDeleteTask(selectedTask?.id)}
                        >
                            Hapus
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedTask(null)}
                        >
                            Tutup
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={Check}
                            onClick={() => {
                                handleToggleDone(
                                    { stopPropagation: () => {} },
                                    selectedTask?.id
                                );
                                setSelectedTask(null);
                            }}
                        >
                            {selectedTask?.status === 'done'
                                ? 'Tandai Belum Selesai'
                                : 'Tandai Selesai (Done)'}
                        </Button>
                    </>
                }
            >
                {selectedTask && (
                    <div className="space-y-4 text-xs text-[#111827]">
                        {/* Meta Grid */}
                        <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                            <div>
                                <span className="text-[10px] font-semibold uppercase text-[#6B7280] tracking-wider block mb-1">
                                    Status Alur Kerja
                                </span>
                                <select
                                    value={selectedTask.status}
                                    onChange={(e) => {
                                        const newSt = e.target.value;
                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === selectedTask.id
                                                    ? { ...t, status: newSt }
                                                    : t
                                            )
                                        );
                                        setSelectedTask((prev) => ({
                                            ...prev,
                                            status: newSt,
                                        }));
                                        toast.success('Status alur kerja diperbarui.');
                                    }}
                                    className="block w-full rounded-lg border border-[#E5E7EB] text-xs text-[#111827] py-1.5 px-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#111827]"
                                >
                                    <option value="todo">Belum Mulai (To Do)</option>
                                    <option value="in_progress">Sedang Dikerjakan (In Progress)</option>
                                    <option value="review">Dalam Tinjauan (Review)</option>
                                    <option value="done">Selesai (Done)</option>
                                </select>
                            </div>
                            <div>
                                <span className="text-[10px] font-semibold uppercase text-[#6B7280] tracking-wider block mb-1">
                                    Prioritas & Tenggat
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={selectedTask.priority} size="xs">
                                        {selectedTask.priority.toUpperCase()}
                                    </Badge>
                                    <span className="text-xs text-[#4B5563] tabular-nums font-medium flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                        {selectedTask.due_date}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
                            <span className="text-[10px] font-semibold uppercase text-[#6B7280] tracking-wider block">
                                Deskripsi Rincian Pekerjaan
                            </span>
                            <p className="text-xs text-[#4B5563] leading-relaxed">
                                {selectedTask.description || 'Tidak ada deskripsi detail tambahan.'}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal Tambah Tugas Baru */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Tambah Tugas Baru"
                subtitle="Tentukan target pekerjaan, hubungkan dengan klien, dan tetapkan tenggat waktu."
                maxWidth="max-w-xl"
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
                            onClick={handleCreateTask}
                        >
                            Buat Tugas
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <Input
                        label="Judul Tugas"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Contoh: Slicing Halaman Invoice & Export PDF"
                        required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Hubungkan Klien
                            </label>
                            <select
                                value={newTaskClient}
                                onChange={(e) => setNewTaskClient(e.target.value)}
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                            >
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
                            <select
                                value={newTaskPriority}
                                onChange={(e) => setNewTaskPriority(e.target.value)}
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                            >
                                <option value="low">Rendah (Low)</option>
                                <option value="medium">Menengah (Medium)</option>
                                <option value="high">Tinggi (High)</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label="Tenggat Waktu (Due Date)"
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                    />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                            Deskripsi Rincian Tugas
                        </label>
                        <textarea
                            rows={3}
                            value={newTaskDesc}
                            onChange={(e) => setNewTaskDesc(e.target.value)}
                            placeholder="Deliverables, kriteria penerimaan, atau catatan teknis..."
                            className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                        />
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}
