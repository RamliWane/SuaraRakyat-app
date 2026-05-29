export interface Report {
  id: string;
  author: string;
  location: string;
  avatar: string;
  category: string;
  status: "Diproses" | "Selesai" | "Ditolak";
  hasImage: boolean;
  imageUri?: string;
  upvotes: number;
  comments: number;
  shares: number;
  urgency?: "Urgensi tinggi" | "Urgensi sedang";
  title: string;
  description: string;
  timeAgo: string;
}

export const reports: Report[] = [
  {
    id: "1",
    author: "Budi Wicaksono",
    location: "Depok, Jawa Barat",
    avatar: "B",
    category: "Infrastruktur",
    status: "Diproses",
    hasImage: false,
    upvotes: 342,
    comments: 0,
    shares: 0,
    urgency: "Urgensi tinggi",
    title: "Jalan berlubang di Jl. Raya Bogor KM 24 sudah 3 tahun tidak diperbaiki",
    description: "Kondisi jalan semakin memburuk setelah hujan deras. Sudah ada 4 kendaraan yang mengalami...",
    timeAgo: "2 jam lalu",
  },
  {
    id: "2",
    author: "Siti Rahayu",
    location: "Condet, Jakarta Timur",
    avatar: "S",
    category: "Lingkungan",
    status: "Diproses",
    hasImage: false,
    upvotes: 128,
    comments: 14,
    shares: 5,
    urgency: "Urgensi sedang",
    title: "Sampah menumpuk di pinggir kali Ciliwung sudah 2 minggu tidak diangkut",
    description: "Bau tidak sedap mulai mengganggu warga sekitar. Sudah lapor ke RT tapi belum ada tindakan...",
    timeAgo: "5 jam lalu",
  },
  {
    id: "3",
    author: "Ahmad Fauzi",
    location: "Bekasi Utara, Jawa Barat",
    avatar: "A",
    category: "Keamanan",
    status: "Selesai",
    hasImage: false,
    upvotes: 89,
    comments: 7,
    shares: 2,
    title: "Lampu jalan mati di Perumahan Griya Indah sudah 1 bulan",
    description: "Sudah banyak warga yang khawatir terutama ibu-ibu yang pulang malam. Mohon segera diperbaiki...",
    timeAgo: "1 hari lalu",
  },
];