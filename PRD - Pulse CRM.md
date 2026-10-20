# **Product Requirement Document (PRD) \- Pulse CRM**

# **1\. Ringkasan Eksekutif & Tujuan Produk**

Pulse CRM dirancang sebagai platform manajemen terpadu berkinerja tinggi yang menggabungkan seluruh alur kerja operasional untuk profesional independen (freelancer) hingga skala bisnis enterprise. Aplikasi ini mengintegrasikan pengelolaan hubungan pelanggan (CRM), manajemen tugas, penjadwalan kalender, penerbitan faktur (invoicing), dan pencatatan arus kas (pemasukan dan pengeluaran) dalam satu platform yang terpusat.

## **Ringkasan Spesifikasi Produk**

* **Nama Produk:** Pulse CRM  
* **Kategori:** Productivity & CRM Dashboard untuk Freelancer & Enterprise  
* **Tech Stack Utama:** Laravel 12, React 18/19, Inertia.js 2.0, Tailwind CSS 4.2, MySQL / PostgreSQL  
* **Tujuan Utama:** Menyediakan antarmuka analitik monokromatik yang bersih, presisi, dan intuitif guna mengeliminasi hambatan manajemen administratif serta menyajikan metrik keuangan dan operasional secara *real-time*.

### **Spesifikasi Versi Tech Stack**

| Lapisan / Komponen | Teknologi | Versi Target / Rekomendasi | Catatan & Dependensi |
| :---- | :---- | :---- | :---- |
| **Backend Runtime** | PHP | `^8.2` / `^8.3` | Ekstensi aktif: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath |
| **Backend Framework** | Laravel | `^12.0` (atau `^11.x`) | Framework inti untuk routing, ORM Eloquent, Form Request, Policies, dan Auth scaffolding |
| **Monolith-SPA Adapter (Backend)** | `inertiajs/inertia-laravel` | `^2.0` | Middleware HandleInertiaRequests, share props global (auth, flash message) |
| **Frontend Framework** | React | `^18.3` / `^19.0` | UI Component library dengan Hooks, Concurrent Features, dan JSX |
| **Monolith-SPA Adapter (Frontend)** | `@inertiajs/react` | `^2.0` | Link, router, useForm, usePage, Head component |
| **CSS Styling Engine** | Tailwind CSS | `^3.4.x` | Konfigurasi custom colors, typography plugin, dan responsive breakpoints |
| **Build Tool & Bundler** | Vite | `^5.4` / `^6.0` | `laravel-vite-plugin` (`^1.0`) dan `@vitejs/plugin-react` untuk Hot Module Replacement (HMR) cepat |
| **Icons & Font** | Google Fonts & Icons | \- | Font: *Plus Jakarta Sans* & *Inter*; Icons: *Material Symbols Outlined* |
| **Database Server** | MySQL / MariaDB | MySQL `8.0+` / MariaDB `10.4+` | InnoDB engine, utf8mb4\_unicode\_ci collation |
| **Node.js Environment** | Node.js & NPM | Node.js `^20.x` / `^22.x` (LTS), NPM `^10.x` | Runtime untuk asset building dan dependency package frontend |

---

# **2\. Sistem Desain & Antarmuka (Monochrome Minimalist Metric)**

## **2.1 Filosofi Desain**

Mengadopsi prinsip *Swiss modernist graphic design* dan *neo-minimalism*. Sistem visual mengutamakan kejelasan hirarki data, fungsionalitas, serta eliminasi ornamen dekoratif yang tidak perlu, sehingga pengguna dapat fokus pada analisis data dan pengambilan keputusan.

## **2.2 Tipografi**

| Elemen Antarmuka | Font Family | Bobot (Weight) | Spesifikasi Khusus |
| :---- | :---- | :---- | :---- |
| Heading & Metrik KPI | Plus Jakarta Sans | SemiBold (600) \- Bold (700) | Menggunakan `tabular-nums` untuk perataan presisi angka |
| Body Text & Form Label | Inter | Regular (400) \- Medium (500) | Keterbacaan tinggi pada tabel dan formulir padat |

## **2.3 Skema Warna**

| Token Warna | Nilai Hex | Peruntukan Utama |
| :---- | :---- | :---- |
| **Canvas / Surface Base** | `#F8F9FA` / `#F9FAFB` | Latar belakang aplikasi / workspace |
| **Card & Container** | `#FFFFFF` | Kontainer data dengan border `1px` (`#E5E7EB`) |
| **Primary / Text Dominan** | `#111827` / `#000000` | Elemen teks utama, tombol primer, dan penekanan |
| **Growth / Positive Accent** | `#10B981` (Latar: `#ECFDF5`) | Indikator varians positif, status *Paid*, dan penyelesaian |
| **Negative Accent** | `#EF4444` (Latar: `#FEF2F2`) | Indikator penurunan, pengeluaran, dan status *Overdue* |
| **Secondary Grayscale** | `#4B5563` / `#6B7280` / `#9CA3AF` | Teks sekunder, ikon pendukung, dan garis batas (borders) |

## **2.4 Radius Sudut (Corner Radius)**

* **Kartu & Kontainer Konten:** `rounded-lg` hingga `rounded-2xl` (16px)  
* **Tombol & Kontrol Formulir:** `rounded` (8px)  
* **Status Pills & Badges:** `rounded-full` (9999px)

---

# **3\. Struktur Layout & Komponen Global**

## **3.1 Persistent Left Sidebar**

* **Dimensi:** Lebar 240px pada tampilan desktop, dapat diciutkan (*collapsible*) menjadi 64px.  
* **Header:** Logo Pulse CRM dan nama aplikasi.  
* **Menu Navigasi:**  
  * Beranda (Dashboard)  
  * Freelance (Dropdown Menu): Client, Task & Kalender, Invoice  
  * Budgeting (Dropdown Menu): Income, Outcome  
  * Settings (Terletak pada bagian bawah sidebar)

## **3.2 Top Navigation Header**

* **Dimensi:** Tinggi fixed 64px dengan efek *backdrop-blur*.  
* **Search Bar:** Pencarian global universal untuk mencari klien, faktur, dan tugas.  
* **Date Range Picker:** Kontrol seleksi rentang waktu analitik (contoh: 30 Hari Terakhir, Kuartal Ini, Tahun Ini).  
* **Notifikasi:** Ikon lonceng dengan *badge indicator* untuk pemberitahuan *real-time*.  
* **Profil Pengguna:** Avatar pengguna, nama akun, dan menu *dropdown* manajemen sesi.

---

# **4\. Spesifikasi Fungsional Per Modul**

## **4.1 Modul Beranda (Dashboard)**

* **KPI Metric Cards:** Menampilkan metrik utama meliputi Pendapatan Bersih, Proyek Aktif, Invoice Tertunda, dan Sisa Saldo Kas. Setiap kartu dilengkapi dengan persentase tren perbandingan terhadap periode sebelumnya.  
* **Chart Analitik:**  
  * *Stacked Bar Chart:* Visualisasi tren finansial bulanan (Pemasukan vs Pengeluaran).  
  * *Heatmap Matrix:* Visualisasi tingkat aktivitas penyelesaian tugas harian.  
* **Quick Actions:** Tombol akses cepat untuk menambah klien baru, membuat invoice baru, atau mencatat transaksi finansial secara instan.

## **4.2 Modul Freelance**

### **Manajemen Klien**

* Tampilan tabel interaktif dengan dukungan pencarian cepat, penyaringan berdasarkan status (Prospek / Aktif / Nonaktif), dan *pagination* di sisi server (*server-side*).  
* Tampilan detail profil klien yang mencakup informasi kontak lengkap, riwayat proyek, dan total akumulasi nilai kontrak.

### **Tugas & Kalender**

* Tampilan ganda yang dapat dialihkan:  
  * *Kanban Board:* Kolom alur kerja (To Do, In Progress, Review, Done) dengan dukungan *drag-and-drop*.  
  * *Kalender:* Tampilan penanggalan bulanan dan mingguan untuk melacak *milestone*.  
* Pengaturan tugas mencakup penentuan tenggat waktu (*due date*), tingkat prioritas (Low, Medium, High), serta keterhubungan langsung dengan proyek klien terkait.

### **Invoicing**

* Formulir pembuatan faktur secara intuitif dengan kalkulasi otomatis untuk subtotal, persentase pajak, dan total tagihan akhir.  
* Pengelolaan status faktur: `Draft`, `Sent`, `Paid`, dan `Overdue`.  
* Fitur ekspor dan pengunduhan faktur langsung ke format PDF standar industri.

## **4.3 Modul Budgeting (Keuangan)**

* **Income (Pemasukan):** Pencatatan penerimaan dana dari pembayaran invoice klien maupun pendapatan tambahan di luar proyek, lengkap dengan integrasi tautan invoice terkait.  
* **Outcome (Pengeluaran):** Pencatatan biaya operasional, langganan alat bantu kerja/server, dan fitur unggah bukti transaksi atau struk pengeluaran.  
* **Analisis Aliran Kas:** Dashboard ringkasan aliran kas yang menyajikan perbandingan pemasukan vs pengeluaran serta kalkulasi otomatis margin keuntungan bersih.

## **4.4 Modul Settings**

* Manajemen preferensi akun, pembaruan profil pengguna, dan perubahan kata sandi secara aman.  
* Konfigurasi sistem: Pengaturan mata uang standar (contoh: IDR, USD), format penanggalan, dan zona waktu operasional.

---

# **5\. Skema Basis Data (Database Schema)**

\+------------------+       \+------------------+       \+-------------------------+

|      users       |       |     clients      |       | financial\_transactions  |

\+------------------+       \+------------------+       \+-------------------------+

| id (PK)          |\<------| user\_id (FK)     |       | id (PK)                 |

| name             |   |---| id (PK)          |\<------| user\_id (FK)            |

| email            |   |   \+------------------+       | type (enum)             |

| password         |   |                              | category                |

| role             |   |   \+------------------+       | amount                  |

| avatar\_url       |   |---| tasks            |       | transaction\_date        |

| timestamps       |   |   \+------------------+       | description             |

\+------------------+   |   | id (PK)          |       | receipt\_path (nullable) |

                       |   | user\_id (FK)     |   |---| invoice\_id (FK, null)   |

                       |---| client\_id (FK)   |   |   | timestamps              |

                       |   | title            |   |   \+-------------------------+

                       |   | status / priority|   |

                       |   \+------------------+   |

                       |                          |

                       |   \+------------------+   |

                       |---| invoices         |   |

                           \+------------------+   |

                           | id (PK)          |\<--|

                           | user\_id (FK)     |

                           | client\_id (FK)   |

                           | invoice\_number   |

                           | total\_amount     |

                           | status           |

                           \+------------------+

                                    |

                                    v

                           \+------------------+

                           |  invoice\_items   |

                           \+------------------+

                           | id (PK)          |

                           | invoice\_id (FK)  |

                           | description      |

                           | total            |

                           \+------------------+

## **Detail Entitas & Kolom**

### **`users`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `name` (Varchar 255\)  
* `email` (Varchar 255, Unique)  
* `password` (Varchar 255\)  
* `role` (Varchar 50, Default: 'user')  
* `avatar_url` (Varchar 255, Nullable)  
* `created_at` / `updated_at` (Timestamp)

### **`clients`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `user_id` (Foreign Key \-\> `users.id`, On Delete Cascade)  
* `company_name` (Varchar 255\)  
* `contact_person` (Varchar 255\)  
* `email` (Varchar 255\)  
* `phone` (Varchar 50, Nullable)  
* `status` (Enum: 'lead', 'active', 'inactive')  
* `notes` (Text, Nullable)  
* `created_at` / `updated_at` (Timestamp)

### **`tasks`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `user_id` (Foreign Key \-\> `users.id`, On Delete Cascade)  
* `client_id` (Foreign Key \-\> `clients.id`, Nullable, On Delete Set Null)  
* `title` (Varchar 255\)  
* `description` (Text, Nullable)  
* `due_date` (Date, Nullable)  
* `priority` (Enum: 'low', 'medium', 'high')  
* `status` (Enum: 'todo', 'in\_progress', 'review', 'done')  
* `created_at` / `updated_at` (Timestamp)

### **`invoices`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `user_id` (Foreign Key \-\> `users.id`, On Delete Cascade)  
* `client_id` (Foreign Key \-\> `clients.id`, On Delete Cascade)  
* `invoice_number` (Varchar 100, Unique)  
* `issue_date` (Date)  
* `due_date` (Date)  
* `subtotal` (Decimal 15, 2\)  
* `tax_rate` (Decimal 5, 2, Default: 0.00)  
* `total_amount` (Decimal 15, 2\)  
* `status` (Enum: 'draft', 'sent', 'paid', 'overdue')  
* `created_at` / `updated_at` (Timestamp)

### **`invoice_items`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `invoice_id` (Foreign Key \-\> `invoices.id`, On Delete Cascade)  
* `description` (Varchar 255\)  
* `quantity` (Integer)  
* `unit_price` (Decimal 15, 2\)  
* `total` (Decimal 15, 2\)  
* `created_at` / `updated_at` (Timestamp)

### **`financial_transactions`**

* `id` (Primary Key, BigInt, Auto Increment)  
* `user_id` (Foreign Key \-\> `users.id`, On Delete Cascade)  
* `type` (Enum: 'income', 'outcome')  
* `category` (Varchar 100\)  
* `amount` (Decimal 15, 2\)  
* `transaction_date` (Date)  
* `description` (Text, Nullable)  
* `receipt_path` (Varchar 255, Nullable)  
* `invoice_id` (Foreign Key \-\> `invoices.id`, Nullable, On Delete Set Null)  
* `created_at` / `updated_at` (Timestamp)

---

# **6\. Arsitektur Teknis & Struktur Folder**

Aplikasi menggunakan pola arsitektur **Monolith Modern** dengan memanfaatkan Inertia.js untuk menghubungkan kerangka kerja Laravel di sisi backend dan React di sisi frontend tanpa memerlukan REST API terpisah secara terpisah.pulse-crm/

├── app/

│   ├── Http/

│   │   ├── Controllers/

│   │   │   ├── DashboardController.php

│   │   │   ├── ClientController.php

│   │   │   ├── TaskController.php

│   │   │   ├── InvoiceController.php

│   │   │   └── BudgetingController.php

│   │   └── Requests/

│   └── Models/

├── resources/

│   ├── js/

│   │   ├── Components/

│   │   │   ├── UI/

│   │   │   │   ├── Button.jsx

│   │   │   │   ├── Input.jsx

│   │   │   │   ├── Card.jsx

│   │   │   │   ├── Badge.jsx

│   │   │   │   └── Modal.jsx

│   │   │   ├── Layouts/

│   │   │   │   ├── AppLayout.jsx

│   │   │   │   ├── Sidebar.jsx

│   │   │   │   └── Topbar.jsx

│   │   │   └── Charts/

│   │   │       ├── StackedBarChart.jsx

│   │   │       └── HeatmapMatrix.jsx

│   │   ├── Pages/

│   │   │   ├── Dashboard/

│   │   │   │   └── Index.jsx

│   │   │   ├── Freelance/

│   │   │   │   ├── Clients/

│   │   │   │   ├── Tasks/

│   │   │   │   └── Invoices/

│   │   │   ├── Budgeting/

│   │   │   │   ├── Income.jsx

│   │   │   │   └── Outcome.jsx

│   │   │   └── Settings/

│   │   │       └── Index.jsx

│   │   └── app.jsx

└── routes/

    └── web.php

---

# **7\. Kebutuhan Non-Fungsional & Keamanan**

## **7.1 Kinerja (Performance)**

* **Kecepatan Muat:** Waktu pemuatan halaman awal dan perpindahan antar-halaman ditargetkan di bawah 1.5 detik.  
* **Optimasi Inertia:** Menggunakan fitur *partial reloading* dan *lazy loading* untuk komponen berat guna meminimalkan pengiriman data berlebih dari server.  
* **Eager Loading:** Menerapkan strategi pencarian database yang efisien (`with()`) pada Laravel ORM untuk mencegah masalah performa *N+1 Query*.

## **7.2 Aksesibilitas (Accessibility)**

* **Kontras Warna:** Memenuhi standar WCAG AA dengan rasio kontras teks minimum 4.5:1 terhadap latar belakang.  
* **Navigasi Keyboard:** Seluruh komponen interaktif (modal, tombol, formulir) dapat diakses penuh menggunakan navigasi keyboard.

## **7.3 Keamanan (Security)**

* **Proteksi CSRF:** Proteksi token CSRF otomatis pada setiap permintaan HTTP yang diproses melalui Inertia.js.  
* **Validasi Data:** Validasi formulir yang ketat di sisi server menggunakan Laravel Form Requests sebelum eksekusi basis data.  
* **Otorisasi Data:** Menerapkan Laravel Policies dan Gates untuk memastikan pengguna hanya dapat membaca, mengubah, atau menghapus data milik mereka sendiri (*multi-tenancy isolation*).

