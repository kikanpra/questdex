import { QuestPack, CollectedCard, User, Rarity } from "../types";
import group303Artwork from "../assets/images/Group 303.png";

export const GROUP_303_ARTWORK_URL = group303Artwork;
export const CARD_BACK_IMAGE =
  "/src/assets/images/questpack_card_back_1791990896106.jpg";

export const DEMO_STUDENT: User = {
  id: "usr-student-01",
  name: "Budi Santoso",
  email: "budi.santoso@univ.ac.id",
  role: "student",
  classId: "IF-2024-A",
  className: "Teknik Informatika (Kelas A)",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
};

export const DEMO_LECTURER: User = {
  id: "usr-lecturer-01",
  name: "Dr. Maya Arifin, M.Kom.",
  email: "maya.arifin@univ.ac.id",
  role: "lecturer",
  classId: "IF-2024-A",
  className: "Dosen Pemrograman Web",
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
};

export const calculateRarityAndPoints = (
  score: number,
): { rarity: Rarity; points: number } => {
  if (score >= 9) return { rarity: "LEGENDARY", points: 100 };
  if (score === 8) return { rarity: "EPIC", points: 80 };
  if (score === 7) return { rarity: "RARE", points: 60 };
  if (score >= 5) return { rarity: "UNCOMMON", points: 40 };
  if (score >= 3) return { rarity: "COMMON", points: 20 };
  return { rarity: "STARTER", points: 10 };
};

export const INITIAL_PACKS: QuestPack[] = [
  {
    id: "pack-html-starter",
    title: "HTML Starter Pack",
    course: "Pemrograman Web Dasar",
    meetingNumber: 1,
    meetingCode: "Pertemuan 01",
    topic: "Struktur DOM & Semantik Web",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: "/src/assets/images/pack_html_starter_1791990895316.jpg",
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#00C7D9",
    description:
      "Pelajari pondasi struktur dokumen web modern, elemen semantik HTML5, atribut aksesibilitas, dan hierarki metadata.",
    questions: [
      {
        id: "q-html-1",
        cardIndex: 1,
        topic: "DOKUMEN HTML",
        prompt:
          "Deklarasi apa yang wajib diletakkan di baris paling pertama dokumen HTML5 untuk memicu standard rendering mode pada browser?",
        type: "multiple-choice",
        options: [
          "<!DOCTYPE html>",
          '<html version="5.0">',
          '<meta charset="UTF-8">',
          "<!DOCTYPE HTML5>",
        ],
        correctAnswer: "<!DOCTYPE html>",
        explanation:
          "<!DOCTYPE html> memberitahu browser untuk merender halaman dalam HTML5 standard mode.",
      },
      {
        id: "q-html-2",
        cardIndex: 2,
        topic: "ELEMEN SEMANTIK",
        prompt:
          "Elemen semantik manakah yang paling tepat untuk membungkus navigasi utama website yang berisi tautan antar halaman?",
        type: "multiple-choice",
        options: ["<nav>", "<menu>", "<header>", "<aside>"],
        correctAnswer: "<nav>",
        explanation:
          "<nav> adalah elemen semantik resmi untuk sekumpulan tautan navigasi utama.",
      },
      {
        id: "q-html-3",
        cardIndex: 3,
        topic: "AKSESIBILITAS WEB",
        prompt:
          'Atribut "alt" pada elemen <img> bersifat opsional dan aman jika dikosongkan pada gambar konten penting.',
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          'Atribut "alt" wajib diisi deskriptif untuk pembaca layar (screen reader) dan aksesibilitas.',
      },
      {
        id: "q-html-4",
        cardIndex: 4,
        topic: "FORMULIR & INPUT",
        prompt:
          "Atribut apa yang menghubungkan elemen <label> secara eksplisit ke elemen <input>?",
        type: "multiple-choice",
        options: ["for (atau htmlFor)", "id", "name", "target"],
        correctAnswer: "for (atau htmlFor)",
        explanation:
          "Atribut for pada <label> merujuk pada id dari elemen <input> terkait.",
      },
      {
        id: "q-html-5",
        cardIndex: 5,
        topic: "VIEWPORT METADATA",
        prompt:
          'Tag <meta name="viewport" content="width=device-width, initial-scale=1.0"> berfungsi untuk mengaktifkan rendering responsif pada perangkat mobile.',
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Tag meta viewport mengatur skala dan lebar viewport mengikuti resolusi layar fisik gawai.",
      },
      {
        id: "q-html-6",
        cardIndex: 6,
        topic: "ELEMEN HEAD",
        prompt:
          "Elemen HTML manakah yang berada di dalam <head> untuk menentukan favicon dan stylesheet eksternal?",
        type: "multiple-choice",
        options: ["<link>", "<style>", "<meta>", "<script>"],
        correctAnswer: "<link>",
        explanation:
          '<link rel="stylesheet"> dan <link rel="icon"> digunakan untuk menghubungkan aset eksternal.',
      },
      {
        id: "q-html-7",
        cardIndex: 7,
        topic: "TABEL DATA",
        prompt:
          "Elemen semantik yang digunakan untuk mengelompokkan baris header dalam tabel HTML adalah...",
        type: "multiple-choice",
        options: ["<thead>", "<th>", "<caption>", "<colgroup>"],
        correctAnswer: "<thead>",
        explanation:
          "<thead> mengelompokkan baris tajuk tabel untuk semantik dan pagination cetak.",
      },
      {
        id: "q-html-8",
        cardIndex: 8,
        topic: "TARGET HYPERLINK",
        prompt:
          "Nilai atribut target apa yang membuat tautan terbuka di tab atau jendela peramban baru?",
        type: "short-answer",
        correctAnswer: "_blank",
        explanation:
          'target="_blank" membuka dokumen yang ditautkan di jendela atau tab baru.',
      },
      {
        id: "q-html-9",
        cardIndex: 9,
        topic: "MEDIA AUDIOPLAYER",
        prompt:
          "Elemen <audio> dan <video> di HTML5 memerlukan plugin Adobe Flash Player untuk memutar berkas multimedia.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "HTML5 memperkenalkan pemutar media bawaan browser tanpa memerlukan plugin pihak ketiga.",
      },
      {
        id: "q-html-10",
        cardIndex: 10,
        topic: "KONTEN INDEPENDEN",
        prompt:
          "Elemen semantik manakah yang paling cocok untuk membungkus artikel blog atau berita yang dapat berdiri sendiri secara mandiri?",
        type: "multiple-choice",
        options: ["<article>", "<section>", "<aside>", "<main>"],
        correctAnswer: "<article>",
        explanation:
          "<article> mendefinisikan komposisi konten yang mandiri dan dapat didistribusikan ulang.",
      },
    ],
  },
  {
    id: "pack-css-quest",
    title: "CSS Quest Pack",
    course: "Pemrograman Web Dasar",
    meetingNumber: 4,
    meetingCode: "Pertemuan 04",
    topic: "Modern Layouts & Design Systems",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: "/src/assets/images/pack_css_quest_1791990895257.jpg",
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#00C7D9",
    description:
      "Kuasai teknik layout modern CSS Grid, Flexbox alignment, stacking context, CSS custom properties, dan responsive break points.",
    questions: [
      {
        id: "q-css-1",
        cardIndex: 1,
        topic: "NAVBAR & POSITIONING",
        prompt:
          "Apa fungsi utama properti position: sticky dalam CSS ketika pengguna menggulir halaman?",
        type: "multiple-choice",
        options: [
          "Elemen bertindak seperti relative sampai mencapai ambang offset, lalu menempel seperti fixed di dalam container induknya",
          "Elemen selalu terkunci di posisi absolut layar terlepas dari container induk",
          "Elemen disembunyikan dari DOM saat pengguna melakukan scroll cepat",
          "Elemen secara otomatis memperkecil tinggi navbar menjadi 50%",
        ],
        correctAnswer:
          "Elemen bertindak seperti relative sampai mencapai ambang offset, lalu menempel seperti fixed di dalam container induknya",
        explanation:
          "position: sticky beralih antara relative dan fixed tergantung posisi scroll dan batas container induknya.",
      },
      {
        id: "q-css-2",
        cardIndex: 2,
        topic: "FLEXBOX ALIGNMENT",
        prompt:
          "Properti Flexbox manakah yang digunakan untuk mendistribusikan ruang kosong di antara item flex sepanjang sumbu utama (main axis)?",
        type: "multiple-choice",
        options: [
          "justify-content",
          "align-items",
          "align-content",
          "flex-basis",
        ],
        correctAnswer: "justify-content",
        explanation:
          "justify-content mengatur perataan dan spasi item sepanjang sumbu utama container.",
      },
      {
        id: "q-css-3",
        cardIndex: 3,
        topic: "BOX SIZING",
        prompt:
          "Nilai box-sizing: border-box memastikan padding dan border dihitung di dalam lebar (width) dan tinggi (height) elemen.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "border-box menyertakan padding dan border dalam dimensi total elemen.",
      },
      {
        id: "q-css-4",
        cardIndex: 4,
        topic: "CSS GRID FR FRACTION",
        prompt:
          'Unit "fr" dalam CSS Grid merepresentasikan fraksi dari ruang bebas (free space) yang tersedia di dalam container grid.',
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "1fr mengalokasikan satu bagian dari sisa ruang kosong container grid.",
      },
      {
        id: "q-css-5",
        cardIndex: 5,
        topic: "SPECIFICITY HIERARCHY",
        prompt:
          "Di antara selektor berikut, manakah yang memiliki nilai spesifisitas (specificity) CSS paling tinggi?",
        type: "multiple-choice",
        options: [
          "#main-header",
          ".nav-item.active",
          "header nav ul li a",
          "div > p",
        ],
        correctAnswer: "#main-header",
        explanation:
          "ID selector (#id) bernilai (1,0,0) yang mengalahkan class, pseudo-class, dan elemen biasa.",
      },
      {
        id: "q-css-6",
        cardIndex: 6,
        topic: "STACKING CONTEXT",
        prompt:
          "Properti z-index akan berfungsi secara efektif hanya jika nilai properti position elemen BUKAN bertipe...",
        type: "short-answer",
        correctAnswer: "static",
        explanation:
          "z-index tidak berpengaruh pada elemen dengan posisi default (position: static).",
      },
      {
        id: "q-css-7",
        cardIndex: 7,
        topic: "CSS VARIABLES",
        prompt:
          "Fungsi CSS apa yang dipanggil untuk mengonsumsi nilai dari CSS custom property seperti --primary-color?",
        type: "multiple-choice",
        options: [
          "var(--primary-color)",
          "val(--primary-color)",
          "use(--primary-color)",
          "prop(--primary-color)",
        ],
        correctAnswer: "var(--primary-color)",
        explanation:
          "Fungsi var() digunakan untuk membaca custom properties CSS.",
      },
      {
        id: "q-css-8",
        cardIndex: 8,
        topic: "PSEUDO-ELEMENTS",
        prompt:
          "Properti wajib apa yang harus dideklarasikan agar pseudo-element ::before atau ::after dapat dirender di layar?",
        type: "short-answer",
        correctAnswer: "content",
        explanation:
          'Tanpa deklarasi content: "" atau konten teks, pseudo-element tidak akan ditampilkan.',
      },
      {
        id: "q-css-9",
        cardIndex: 9,
        topic: "MEDIA QUERIES",
        prompt:
          "Sintaks @media (prefers-color-scheme: dark) mendeteksi preferensi tema gelap dari sistem operasi pengguna.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Media query prefers-color-scheme membaca preferensi tema terang/gelap pada OS atau browser pengguna.",
      },
      {
        id: "q-css-10",
        cardIndex: 10,
        topic: "CSS TRANSFORM & HARDWARE ACCELERATION",
        prompt:
          "Properti transform apa yang ideal digunakan untuk animasi halus 60fps karena diproses oleh GPU (compositor)?",
        type: "multiple-choice",
        options: [
          "transform (translate3d/scale) & opacity",
          "width & height",
          "top & left margin",
          "padding & border",
        ],
        correctAnswer: "transform (translate3d/scale) & opacity",
        explanation:
          "Transform dan opacity diproses langsung oleh GPU thread tanpa memicu layout re-flow.",
      },
    ],
  },
  {
    id: "pack-js-challenge",
    title: "JavaScript Challenge Pack",
    course: "Pemrograman Web Lanjutan",
    meetingNumber: 7,
    meetingCode: "Pertemuan 07",
    topic: "Asynchronous Programming & ES6+",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: "/src/assets/images/pack_js_challenge_1791990896023.jpg",
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#F59E0B",
    description:
      "Tantangan logika asynchronous, eksekusi Promise concurrency, Web APIs, Event Loop, closures, dan modular JavaScript.",
    questions: [
      {
        id: "q-js-1",
        cardIndex: 1,
        topic: "PROMISE CONCURRENCY",
        prompt:
          "Apa perilaku Promise.all([p1, p2, p3]) jika salah satu Promise p2 mengalami reject?",
        type: "multiple-choice",
        options: [
          "Langsung menolak (reject) seketika dengan error dari p2 tanpa menunggu sisa promise lainnya",
          "Mengabaikan p2 dan tetap mengembalikan array hasil dari p1 dan p3",
          "Mengulang eksekusi p2 sebanyak 3 kali secara otomatis",
          "Menghasilkan nilai undefined untuk p2 dan resolve seluruhnya",
        ],
        correctAnswer:
          "Langsung menolak (reject) seketika dengan error dari p2 tanpa menunggu sisa promise lainnya",
        explanation:
          "Promise.all bersifat fail-fast; segera reject jika ada satu Promise yang gagal.",
      },
      {
        id: "q-js-2",
        cardIndex: 2,
        topic: "ASYNC / AWAIT",
        prompt:
          'Kata kunci "await" hanya valid ditulis di dalam fungsi yang dideklarasikan dengan kata kunci "async".',
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Await memerlukan konteks async function (atau top-level await di ES Modules).",
      },
      {
        id: "q-js-3",
        cardIndex: 3,
        topic: "EVENT LOOP",
        prompt:
          "Antrean manakah yang diproses lebih dulu oleh JavaScript runtime setelah Call Stack kosong?",
        type: "multiple-choice",
        options: [
          "Microtask Queue (Promise callbacks, queueMicrotask)",
          "Macrotask Queue (setTimeout, setInterval)",
          "Rendering Paint Phase",
          "DOM Mutation Events",
        ],
        correctAnswer: "Microtask Queue (Promise callbacks, queueMicrotask)",
        explanation:
          "Microtask Queue selalu dikuras habis terlebih dahulu sebelum mengambil macrotask berikutnya.",
      },
      {
        id: "q-js-4",
        cardIndex: 4,
        topic: "CLOSURES",
        prompt:
          "Closure memungkinkan sebuah inner function tetap memiliki akses ke variabel di scope lexical induknya bahkan setelah fungsi luar selesai dieksekusi.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Closure mempertahankan referensi ke lingkup leksikal saat fungsi tersebut dibuat.",
      },
      {
        id: "q-js-5",
        cardIndex: 5,
        topic: "ARRAY METHODS",
        prompt:
          "Method Array manakah yang memetakan elemen dan mengembalikan akumulasi nilai tunggal dari seluruh isi array?",
        type: "multiple-choice",
        options: ["reduce()", "map()", "filter()", "forEach()"],
        correctAnswer: "reduce()",
        explanation:
          "Array.prototype.reduce() mengakumulasikan nilai menjadi satu output.",
      },
      {
        id: "q-js-6",
        cardIndex: 6,
        topic: "OBJECT DESTRUCTURING",
        prompt:
          "Operator apa yang digunakan untuk mengumpulkan sisa properti object atau parameter sisa ke dalam satu variabel?",
        type: "short-answer",
        correctAnswer: "...",
        explanation:
          "Rest operator (...) mengumpulkan argumen atau properti tersisa ke dalam array atau objek.",
      },
      {
        id: "q-js-7",
        cardIndex: 7,
        topic: "IMMUTABILITY",
        prompt:
          "Method Object.freeze() melakukan deep freeze pada nested object secara otomatis tanpa rekursi.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "Object.freeze bersifat shallow; objek bertingkat di dalamnya tetap dapat diubah kecuali dibekukan secara rekursif.",
      },
      {
        id: "q-js-8",
        cardIndex: 8,
        topic: "TYPE EQUALITY",
        prompt:
          "Berapakah hasil dari evaluasi ekspresi: typeof null dalam JavaScript?",
        type: "short-answer",
        correctAnswer: "object",
        explanation:
          'typeof null mengembalikan "object", sebuah bug historis sejak versi awal JavaScript yang dipertahankan.',
      },
      {
        id: "q-js-9",
        cardIndex: 9,
        topic: "FETCH API",
        prompt: "Method response.json() pada Fetch API mengembalikan sebuah...",
        type: "multiple-choice",
        options: [
          "Promise yang me-resolve hasil parsing JSON",
          "String JSON mentah secara sinkron",
          "Array Buffer biner",
          "Objek JavaScript langsung secara sinkron",
        ],
        correctAnswer: "Promise yang me-resolve hasil parsing JSON",
        explanation:
          "response.json() mengembalikan Promise karena parsing data stream bertahap secara asinkron.",
      },
      {
        id: "q-js-10",
        cardIndex: 10,
        topic: "LOCAL STORAGE",
        prompt:
          "Data yang tersimpan di dalam localStorage akan hilang secara otomatis ketika tab browser ditutup.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "Data di localStorage persisten tanpa batas waktu. sessionStorage yang terhapus saat tab ditutup.",
      },
    ],
  },
  {
    id: "pack-database-quest",
    title: "Database Quest Pack",
    course: "Basis Data Relasional",
    meetingNumber: 5,
    meetingCode: "Pertemuan 05",
    topic: "Relational Design & Complex Queries",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: "/src/assets/images/pack_database_quest_1791990898010.jpg",
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#38BDF8",
    description:
      "Eksplorasi arsitektur database relasional, normalisasi skema 1NF-3NF, transaksi ACID, indeks B-Tree, dan optimasi query SQL.",
    questions: [
      {
        id: "q-db-1",
        cardIndex: 1,
        topic: "NORMALISASI BASIS DATA",
        prompt:
          "Bentuk normal manakah (NF) yang mensyaratkan setiap atribut non-kunci harus bergantung penuh pada seluruh Primary Key (menghilangkan partial dependency)?",
        type: "multiple-choice",
        options: [
          "2NF (Second Normal Form)",
          "1NF (First Normal Form)",
          "3NF (Third Normal Form)",
          "BCNF (Boyce-Codd NF)",
        ],
        correctAnswer: "2NF (Second Normal Form)",
        explanation:
          "2NF menghilangkan ketergantungan parsial pada composite primary key.",
      },
      {
        id: "q-db-2",
        cardIndex: 2,
        topic: "JOIN OPERATIONS",
        prompt:
          "Klausul SQL JOIN apa yang mengembalikan seluruh baris dari tabel kiri dan baris yang cocok dari tabel kanan (atau NULL jika tidak ada kecocokan)?",
        type: "multiple-choice",
        options: [
          "LEFT JOIN (atau LEFT OUTER JOIN)",
          "INNER JOIN",
          "CROSS JOIN",
          "RIGHT JOIN",
        ],
        correctAnswer: "LEFT JOIN (atau LEFT OUTER JOIN)",
        explanation:
          "LEFT JOIN mempertahankan semua rekaman dari tabel sebelah kiri.",
      },
      {
        id: "q-db-3",
        cardIndex: 3,
        topic: "TRANSAKSI ACID",
        prompt:
          'Prinsip "Atomicity" dalam ACID memastikan bahwa transaksi basis data berhasil dieksekusi seluruhnya atau dibatalkan sama sekali (all or nothing).',
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Atomisitas menjamin tidak ada transaksi yang tersimpan setengah jalan jika terjadi kegagalan.",
      },
      {
        id: "q-db-4",
        cardIndex: 4,
        topic: "PRIMARY KEY",
        prompt:
          "Sebuah tabel dalam basis data relasional dapat memiliki lebih dari satu Primary Key.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "Tabel hanya boleh memiliki satu Primary Key, meskipun kunci tersebut bisa terdiri dari beberapa kolom (composite key).",
      },
      {
        id: "q-db-5",
        cardIndex: 5,
        topic: "AGGREGATION & FILTERING",
        prompt:
          "Klausul apa yang digunakan untuk menyaring hasil baris setelah operasi GROUP BY pada SQL?",
        type: "short-answer",
        correctAnswer: "HAVING",
        explanation:
          "HAVING memfilter data agregat grup, sedangkan WHERE memfilter baris sebelum agregasi.",
      },
      {
        id: "q-db-6",
        cardIndex: 6,
        topic: "INDEXING B-TREE",
        prompt:
          "Menambahkan indeks (Index) pada kolom tabel selalu mempercepat operasi INSERT dan UPDATE.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "Indeks mempercepat operasi SELECT (pencarian), namun menambah overhead komputasi saat INSERT dan UPDATE karena struktur indeks harus diperbarui.",
      },
      {
        id: "q-db-7",
        cardIndex: 7,
        topic: "REFERENTIAL INTEGRITY",
        prompt:
          "Aksi integritas referensial apa yang secara otomatis menghapus rekaman anak ketika baris induk pada tabel utama dihapus?",
        type: "multiple-choice",
        options: [
          "ON DELETE CASCADE",
          "ON DELETE SET NULL",
          "ON DELETE RESTRICT",
          "ON DELETE NO ACTION",
        ],
        correctAnswer: "ON DELETE CASCADE",
        explanation:
          "CASCADE meneruskan aksi penghapusan induk ke baris turunan di tabel referensi.",
      },
      {
        id: "q-db-8",
        cardIndex: 8,
        topic: "SQL DDL VS DML",
        prompt:
          "Perintah SQL manakah berikut ini yang tergolong dalam Data Manipulation Language (DML)?",
        type: "multiple-choice",
        options: ["UPDATE", "CREATE TABLE", "ALTER TABLE", "DROP DATABASE"],
        correctAnswer: "UPDATE",
        explanation:
          "UPDATE memanipulasi data di dalam tabel (DML), sedangkan CREATE dan ALTER adalah DDL.",
      },
      {
        id: "q-db-9",
        cardIndex: 9,
        topic: "UNIQUE CONSTRAINT",
        prompt:
          "Kolom dengan batasan UNIQUE diizinkan menyimpan nilai NULL lebih dari satu kali pada standar PostgreSQL dan MySQL.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Pada standar SQL, nilai NULL merepresentasikan nilai yang tidak diketahui (unknown), sehingga dua NULL tidak dianggap identik.",
      },
      {
        id: "q-db-10",
        cardIndex: 10,
        topic: "SUBQUERY",
        prompt:
          "Operator apa yang digunakan untuk memeriksa keberadaan rekaman yang dihasilkan oleh sebuah correlated subquery?",
        type: "short-answer",
        correctAnswer: "EXISTS",
        explanation:
          "Operator EXISTS menguji apakah subquery mengembalikan setidaknya satu baris hasil.",
      },
    ],
  },
  {
    id: "pack-final-project",
    title: "Final Project Pack",
    course: "Rekayasa Perangkat Lunak",
    meetingNumber: 14,
    meetingCode: "Pertemuan 14",
    topic: "Capstone Architecture & Deployment",
    cardCount: 10,
    timeLimitMinutes: 20,
    coverImage: "/src/assets/images/pack_final_project_1791990929991.jpg",
    assignedClass: "IF-2024-A",
    isPublished: true,
    accentColor: "#A855F7",
    description:
      "Puncak evaluasi capstone: arsitektur REST API, CI/CD pipeline, Git flow, unit testing, dan standar keamanan aplikasi web modern.",
    questions: [
      {
        id: "q-final-1",
        cardIndex: 1,
        topic: "REST ARCHITECTURE",
        prompt:
          "HTTP method manakah yang bersifat idempotent dan secara semantik digunakan untuk memperbarui keseluruhan representasi sebuah resource?",
        type: "multiple-choice",
        options: ["PUT", "POST", "PATCH", "CONNECT"],
        correctAnswer: "PUT",
        explanation:
          "PUT bersifat idempotent dan menggantikan resource secara keseluruhan. PATCH untuk pembaruan parsial.",
      },
      {
        id: "q-final-2",
        cardIndex: 2,
        topic: "GIT BRANCHING",
        prompt:
          "Dalam alur kerja Git Flow standar, branch apa yang menyimpan kode produksi stabil yang siap dirilis ke pengguna publik?",
        type: "multiple-choice",
        options: ["main (atau master)", "develop", "release", "hotfix"],
        correctAnswer: "main (atau master)",
        explanation:
          "Branch main menyimpan versi release resmi yang siap di-deploy ke environment produksi.",
      },
      {
        id: "q-final-3",
        cardIndex: 3,
        topic: "PENGUJIAN PERANGKAT LUNAK",
        prompt:
          "Unit testing menguji integrasi antara beberapa subsistem, database, dan API pihak ketiga secara bersamaan.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Salah",
        explanation:
          "Unit testing menguji unit kode terkecil (fungsi/komponen) secara terisolasi. Pengujian gabungan disebut Integration Testing.",
      },
      {
        id: "q-final-4",
        cardIndex: 4,
        topic: "KEAMANAN WEB (CORS)",
        prompt: "Apa kepanjangan dari mekanisme keamanan browser CORS?",
        type: "short-answer",
        correctAnswer: "Cross-Origin Resource Sharing",
        explanation:
          "CORS memungkinkan server menentukan origin mana yang berhak meminta resource eksternal.",
      },
      {
        id: "q-final-5",
        cardIndex: 5,
        topic: "AUTHENTICATION TOKENS",
        prompt:
          "JWT (JSON Web Token) terdiri dari tiga bagian terpisah titik: Header, Payload, dan Signature.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Struktur baku JWT adalah header.payload.signature yang di-encode Base64Url.",
      },
      {
        id: "q-final-6",
        cardIndex: 6,
        topic: "CI/CD PIPELINE",
        prompt: "Tujuan utama dari Continuous Integration (CI) adalah...",
        type: "multiple-choice",
        options: [
          "Mengotomatiskan build dan pengujian kode setiap kali ada commit atau pull request ke repository",
          "Mengirim email pemasaran ke klien setiap hari Senin",
          "Menghapus database staging secara terjadwal",
          "Menyalin file source code ke flashdisk cadangan",
        ],
        correctAnswer:
          "Mengotomatiskan build dan pengujian kode setiap kali ada commit atau pull request ke repository",
        explanation:
          "CI memastikan kode yang digabungkan lulus tes otomatis dan tidak merusak sistem.",
      },
      {
        id: "q-final-7",
        cardIndex: 7,
        topic: "DESIGN PATTERNS",
        prompt:
          "Pola desain perangkat lunak apa yang membatasi pembuatan instance sebuah kelas menjadi hanya satu objek tunggal di seluruh aplikasi?",
        type: "multiple-choice",
        options: ["Singleton", "Factory", "Observer", "Strategy"],
        correctAnswer: "Singleton",
        explanation:
          "Singleton pattern memastikan hanya ada 1 instance kelas yang beroperasi dalam runtime.",
      },
      {
        id: "q-final-8",
        cardIndex: 8,
        topic: "DATABASE MIGRATIONS",
        prompt:
          "Skrip database migration memungkinkan tim pengembang melacak dan mereplikasi perubahan skema database secara terstruktur di seluruh tim.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation: "Migration adalah version control untuk skema basis data.",
      },
      {
        id: "q-final-9",
        cardIndex: 9,
        topic: "CACHE HEADERS",
        prompt:
          "Header HTTP apa yang digunakan untuk mengontrol durasi penyimpanan salinan respons di cache peramban atau CDN?",
        type: "short-answer",
        correctAnswer: "Cache-Control",
        explanation:
          "Cache-Control (seperti max-age, public, private) mengatur kebijakan caching.",
      },
      {
        id: "q-final-10",
        cardIndex: 10,
        topic: "DOCKER CONTAINER",
        prompt:
          "Container Docker membagikan kernel OS host yang sama dan jauh lebih ringan daripada Virtual Machine (VM) tradisional.",
        type: "true-false",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation:
          "Docker mengisolasi proses menggunakan kernel namespace host tanpa memerlukan hypervisor VM penuh.",
      },
    ],
  },
];

export const INITIAL_COLLECTED_CARDS: CollectedCard[] = [
  {
    id: "card-css-01",
    packId: "pack-css-quest",
    packTitle: "CSS Quest Pack",
    course: "Pemrograman Web Dasar",
    meetingNumber: 4,
    score: 8,
    maxScore: 10,
    rarity: "EPIC",
    points: 80,
    collectedAt: "2026-10-10 14:32",
    cardTitle: "CSS Explorer",
    artworkUrl: GROUP_303_ARTWORK_URL,
  },
  {
    id: "card-html-01",
    packId: "pack-html-starter",
    packTitle: "HTML Starter Pack",
    course: "Pemrograman Web Dasar",
    meetingNumber: 1,
    score: 10,
    maxScore: 10,
    rarity: "LEGENDARY",
    points: 100,
    collectedAt: "2026-10-08 09:15",
    cardTitle: "Semantic Master",
    artworkUrl: GROUP_303_ARTWORK_URL,
  },
  {
    id: "card-db-01",
    packId: "pack-database-quest",
    packTitle: "Database Quest Pack",
    course: "Basis Data Relasional",
    meetingNumber: 5,
    score: 7,
    maxScore: 10,
    rarity: "RARE",
    points: 60,
    collectedAt: "2026-10-12 16:40",
    cardTitle: "Schema Architect",
    artworkUrl: GROUP_303_ARTWORK_URL,
  },
];

export const INITIAL_LEADERBOARD = [
  {
    userId: "usr-student-02",
    userName: "Aulia Rahmawati",
    className: "Teknik Informatika (Kelas A)",
    totalPoints: 340,
    cardsCollected: 4,
    legendaryCount: 2,
  },
  {
    userId: "usr-student-01",
    userName: "Budi Santoso (Anda)",
    className: "Teknik Informatika (Kelas A)",
    totalPoints: 240,
    cardsCollected: 3,
    legendaryCount: 1,
  },
  {
    userId: "usr-student-03",
    userName: "Dimas Prasetyo",
    className: "Teknik Informatika (Kelas A)",
    totalPoints: 200,
    cardsCollected: 3,
    legendaryCount: 0,
  },
  {
    userId: "usr-student-04",
    userName: "Siti Nurhaliza",
    className: "Teknik Informatika (Kelas A)",
    totalPoints: 180,
    cardsCollected: 2,
    legendaryCount: 1,
  },
  {
    userId: "usr-student-05",
    userName: "Rian Pratama",
    className: "Teknik Informatika (Kelas A)",
    totalPoints: 120,
    cardsCollected: 2,
    legendaryCount: 0,
  },
];
