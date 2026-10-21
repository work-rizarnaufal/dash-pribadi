import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import { useToast } from '@/Context/ToastContext';
import {
    Save,
    User,
    Lock,
    Globe,
    BellRing,
    Sliders,
    Check,
} from 'lucide-react';

export default function SettingsIndex() {
    const [saved, setSaved] = useState(false);
    const { toast } = useToast();

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        toast.success('Pengaturan regional dan preferensi sistem berhasil disimpan!');
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <AppLayout
            title="Pengaturan Sistem"
            subtitle="Konfigurasi preferensi akun, mata uang standar, zona waktu, dan keamanan sesi."
            actions={
                <Button
                    variant="primary"
                    size="sm"
                    leftIcon={saved ? Check : Save}
                    onClick={handleSave}
                >
                    {saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
                </Button>
            }
        >
            <div className="max-w-4xl space-y-6">
                {/* 1. General System Preferences */}
                <Card
                    title="Konfigurasi Regional & Mata Uang"
                    subtitle="Pengaturan format penomoran, mata uang default pembukuan, dan zona waktu."
                >
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Mata Uang Utama
                                </label>
                                <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                    <option value="IDR">IDR (Rupiah Indonesia - Rp)</option>
                                    <option value="USD">USD (US Dollar - $)</option>
                                    <option value="SGD">SGD (Singapore Dollar - S$)</option>
                                    <option value="EUR">EUR (Euro - €)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Zona Waktu Operasional
                                </label>
                                <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                    <option value="Asia/Jakarta">Asia/Jakarta (WIB, UTC+7)</option>
                                    <option value="Asia/Makassar">Asia/Makassar (WITA, UTC+8)</option>
                                    <option value="Asia/Jayapura">Asia/Jayapura (WIT, UTC+9)</option>
                                    <option value="UTC">UTC (Universal Time)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Format Penanggalan
                                </label>
                                <select className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#111827]">
                                    <option>DD MMMM YYYY (Contoh: 20 Oktober 2026)</option>
                                    <option>YYYY-MM-DD (Contoh: 2026-10-20)</option>
                                    <option>DD/MM/YYYY (Contoh: 20/10/2026)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                    Tarif PPN Standar (%)
                                </label>
                                <Input type="number" defaultValue="11" />
                            </div>
                        </div>
                    </form>
                </Card>

                {/* 2. User Profile Details */}
                <Card
                    title="Informasi Profil & Bisnis"
                    subtitle="Identitas yang akan tertera pada kop faktur/invoice resmi ke klien."
                >
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Nama Lengkap" defaultValue="Administrator" required />
                            <Input label="Email Akun" type="email" defaultValue="admin@pulsecrm.id" required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Nama Agensi / Brand Bisnis" defaultValue="Pulse Creative Studio" />
                            <Input label="Nomor WhatsApp Bisnis" defaultValue="+62 812-3456-7890" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                                Alamat Kantor / Domisili Faktur
                            </label>
                            <textarea
                                rows={2}
                                defaultValue="Jl. Jend. Sudirman Kav. 52-53, Senayan, Kebayoran Baru, Jakarta Selatan 12190"
                                className="block w-full rounded-lg border border-[#E5E7EB] text-sm text-[#111827] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#111827]"
                            />
                        </div>
                    </form>
                </Card>

                {/* 3. Security & Password */}
                <Card
                    title="Keamanan & Kata Sandi"
                    subtitle="Pastikan akun Anda terlindungi dengan kombinasi kata sandi yang kuat."
                >
                    <form className="space-y-4">
                        <Input label="Kata Sandi Saat Ini" type="password" placeholder="••••••••" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Kata Sandi Baru" type="password" placeholder="Minimal 8 karakter" />
                            <Input label="Konfirmasi Kata Sandi Baru" type="password" placeholder="Ulangi kata sandi" />
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}

