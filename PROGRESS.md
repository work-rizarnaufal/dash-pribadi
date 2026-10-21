# **Pulse CRM — Project Progress & Handover Document**

Dokumen ini dibuat sebagai acuan status terkini proyek Pulse CRM agar sesi pengembangan berikutnya dapat langsung melanjutkan tanpa kehilangan konteks.

---

## **1. Identitas & Tech Stack Proyek**
* **Nama Produk**: Pulse CRM (Executive Productivity & Financial Dashboard)
* **Spesifikasi Acuan**:
  * [PRD - Pulse CRM.md](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/PRD%20-%20Pulse%20CRM.md)
  * [DESIGN.md](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/DESIGN.md) (Monochrome Minimalist Metric - Swiss Neo-Minimalism)
* **Backend Runtime & Framework**: PHP 8.2 + **Laravel 12.70.0**
* **Monolith-SPA Adapter**: `inertiajs/inertia-laravel` (v2.0.28) + `@inertiajs/react` (v2.0.0)
* **Frontend Library**: **React 18** + Vite 7
* **CSS & Design Engine**: Tailwind CSS + Google Fonts (*Plus Jakarta Sans* & *Inter*) + `lucide-react`
* **Status Build**: `npm run build` terkompilasi **100% sukses** tanpa error.

---

## **2. Status Skill & Aturan Coding**
* **Antislop Suite**:
  * Status: **Aktif Global** (`%APPDATA%\antislop\settings.json` $\rightarrow$ `{"mode": "during"}`).
  * Modul: Core, UI, Copywriting, Human/A11y, Mobile Layout, Code Comments.
  * Mencegah gaya AI generik (tidak ada ornamen tanpa fungsi, visual bersih dan beralasan).
* **Ponytail Suite**:
  * Status: **Aktif Global** (`%APPDATA%\ponytail\config.json` $\rightarrow$ `{"defaultMode": "full"}`).
  * Prinsip: *Lazy Senior Dev* — solusi kode paling ringkas, zero bloat, YAGNI, selalu melaporkan hal yang dilewati/risiko.
* **Better Design MCP**:
  * Telah **dihapus bersih** dari konfigurasi global agar menghemat token dan menjaga performa respons tetap instan.
* **Aturan Git Repository**:
  * **DILARANG KERAS** melakukan `git push` ke repository secara otomatis.
  * Push hanya boleh dilakukan manual oleh pengguna atau atas perintah eksplisit langsung dari pengguna.

---

## **3. Fitur & Komponen yang Telah Selesai (Frontend UI/UX)**

### **A. Atomic UI Components (`resources/js/Components/UI/`)**
1. [Button.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Button.jsx): Variasi `primary` (Deep Slate Black `#111827`), `secondary` (hairline border `#E5E7EB`), `ghost`, `danger`, icon, dan state loading.
2. [Input.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Input.jsx): Input text, number, date dengan label uppercase, state error, helper text, dan icon.
3. [Card.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Card.jsx): Container kartu monokromatik (`#FFFFFF`, border `1px` `#E5E7EB`, `rounded-2xl`, subtle shadow).
4. [Badge.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Badge.jsx): Status pills & trend badges (`growth` `#10B981`, `negative` `#EF4444`, invoice & client status).
5. [Modal.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Modal.jsx): Accessible dialog modal dengan backdrop blur (`rgba(17,24,39,0.4)`), scroll lock, dan shortcut keyboard Escape.
6. [Toast.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/UI/Toast.jsx) & [ToastContext.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Context/ToastContext.jsx): Sistem notifikasi floating toast pojok kanan atas (`fixed top-5 right-5 z-50`) dengan varian status (`success`, `error`, `warning`, `info`), auto-dismiss 4 detik, animasi slide-down `.animate-toast`, sinkronisasi otomatis Inertia flash message, dan hook universal `useToast()`.

### **B. Data Visualization & Charts (`resources/js/Components/Charts/`)**
1. [StackedBarChart.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/Charts/StackedBarChart.jsx): Visualisasi komparasi Pemasukan vs Pengeluaran bulanan dengan radius sudut terminal 6px (`rounded-t-[6px]`) murni monokromatik.
2. [HeatmapMatrix.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/Charts/HeatmapMatrix.jsx): Matriks aktivitas penyelesaian tugas harian 15 minggu (blok 12px × 12px, radius 3px).

### **C. Shell & Layout (`resources/js/Layouts/` & `Components/Layouts/`)**
1. [Sidebar.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/Layouts/Sidebar.jsx): Navigasi kiri persisten (240px desktop, collapsible 64px, drawer mobile) dengan submenu Freelance, Budgeting, Settings.
2. [Topbar.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/Layouts/Topbar.jsx): Header fixed 64px dengan backdrop-blur, universal search bar lebar (`⌘K`), selector rentang tanggal, notifikasi, dan profil user (padding responsif lebar `px-4 sm:px-6 lg:px-8 xl:px-10`).
3. [AppLayout.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Layouts/AppLayout.jsx): Shell aplikasi utama dengan kontainer lebar widescreen (`max-w-[1680px]` mx-auto) dan sistem notifikasi toast mengambang terintegrasi.

### **D. Halaman Modul PRD (`resources/js/Pages/`)**
1. **Beranda Eksekutif** ([Dashboard/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Dashboard/Index.jsx)): 4 KPI Cards (Pendapatan Bersih, Proyek Aktif, Invoice Tertunda, Saldo Kas) dengan kelas `.font-metric` (*Plus Jakarta Sans*, `tabular-nums`, `-0.03em` tracking), Stacked Bar Chart, Heatmap Matrix, transaksi terakhir, dan tugas prioritas.
2. **Manajemen Klien** ([Clients/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Freelance/Clients/Index.jsx)): Tabel interaktif dengan filter status, modal pendaftaran klien baru (terhubung ke state reaktif), **Modal Detail Profil & Aksi Klien** (pengalih status kemitraan langsung *Aktif/Prospek/Nonaktif*, salin kontak instan dengan clipboard API, navigasi buat faktur, dan tombol hapus klien), serta **Modal Edit Data Klien** dan **Modal Konfirmasi Hapus Klien**.
3. **Proyek & Maintenance** ([Projects/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Freelance/Projects/Index.jsx)): Pemantauan proyek berjalan (*development*), kontrak *maintenance SLA*, pelacakan masa garansi, kalkulasi MRR retainer, reminder renewal kontrak (<30 hari), modal pendaftaran proyek/SLA baru, **Sistem Pelacakan Aset Hosting & Domain** (tab khusus aset web, pencatatan nama domain, provider hosting, siklus paket, perbandingan harga beli awal vs harga renewal normal, alert jatuh tempo renewal, dan aksi cepat penagihan renewal ke klien), serta **Modal Detail & Aksi Proyek/SLA**.
4. **Tugas & Kalender** ([Tasks/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Freelance/Tasks/Index.jsx)): Pilihan tampilan ganda (Kanban Board 4 kolom & Kalender bulanan). Dilengkapi dengan **Native HTML5 Drag-and-Drop** antar kolom (*To Do, In Progress, Review, Done*), dropzone visual feedback (`ring-2 ring-[#111827]/10`), toast notifikasi perpindahan status, kalender interaktif dengan pengalih bulan (*September, Oktober, November 2026*), integrasi klik tanggal langsung untuk buat tugas, serta **Modal Detail & Edit Tugas**.
5. **Invoicing** ([Invoices/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Freelance/Invoices/Index.jsx)): Daftar faktur dengan filter status, modal pembuatan faktur baru dengan input dinamis line items + PPN 11% yang langsung ditambahkan ke tabel, serta **Modal Pratinjau Faktur Resmi & Aksi Dokumen** (pengubah status faktur interaktif *Lunas, Terkirim, Jatuh Tempo, Konsep*, aksi cetak dokumen / unduh PDF via dialog print browser, pengiriman via email ke klien, dan modal konfirmasi hapus faktur).
6. **Budgeting** ([Income.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Budgeting/Income.jsx) & [Outcome.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Budgeting/Outcome.jsx)): Rekap penerimaan invoice dan pengeluaran operasional dengan dropzone bukti struk nota.
7. **Pengaturan** ([Settings/Index.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Pages/Settings/Index.jsx)): Konfigurasi mata uang (IDR/USD), zona waktu (WIB/UTC), format tanggal, dan data profil bisnis faktur.

---

## **4. Prioritas Kerja untuk Sesi Berikutnya (Next Action Items)**

1. **Pembuatan Migration Basis Data (Sesuai PRD Bagian 5 & Fitur Maintenance)**:
   - File migration telah disiapkan (Pending - belum dieksekusi):
     - `clients` (`2026_10_21_100000_create_clients_table.php`)
     - `projects` (`2026_10_21_120000_create_projects_table.php`)
   - Yang perlu dibuat berikutnya:
     - `tasks` (`user_id`, `client_id`, `project_id`, `title`, `description`, `due_date`, `priority`, `status`)
     - `invoices` (`user_id`, `client_id`, `project_id`, `invoice_number`, `issue_date`, `due_date`, `subtotal`, `tax_rate`, `total_amount`, `status`)
     - `invoice_items` (`invoice_id`, `description`, `quantity`, `unit_price`, `total`)
     - `financial_transactions` (`user_id`, `type`, `category`, `amount`, `transaction_date`, `description`, `receipt_path`, `invoice_id`)
2. **Pembuatan Eloquent Models & Relasi**:
   - `Client`, `Project`, `Task`, `Invoice`, `InvoiceItem`, `FinancialTransaction` dengan relasi `belongsTo(User::class)`.
3. **Pengamanan Rute & Controller Backend**:
   - Pindahkan rute di [routes/web.php](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/routes/web.php) ke dalam grup middleware `auth`.
   - Hubungkan Inertia Pages dengan Controller nyata (`DashboardController`, `ClientController`, `TaskController`, `InvoiceController`, `BudgetingController`).
4. **Unit/Feature Test Suite**:
   - Status: **100% Hijau** (`25 passed, 62 assertions`).
   - Assertion [tests/Feature/ExampleTest.php](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/tests/Feature/ExampleTest.php) telah disesuaikan dengan redirection root ke dashboard (`assertRedirect('/dashboard')`).
5. **Konfigurasi CSS & Tailwind v4 Engine**:
   - Konfigurasi `@tailwindcss/postcss` aktif di [postcss.config.js](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/postcss.config.js).
   - [resources/css/app.css](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/css/app.css) telah dimigrasikan ke Tailwind v4 CSS-first (`@import "tailwindcss"`, `@source`, `@plugin`, `@theme`), menghasilkan output styling 63.9 kB tanpa ada utility class React yang hilang.
   - [resources/js/Components/Layouts/Sidebar.jsx](file:///d:/Rizar/PROJECT/Pribadi/dash-pribadi/resources/js/Components/Layouts/Sidebar.jsx) telah dirapikan secara modular dan deklaratif (`NAV_GROUPS`).

