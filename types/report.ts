export type Report = {
  id: number;
  judul: string;
  lokasi: string;
  deskripsi: string;
  urgensi: "rendah" | "sedang" | "tinggi" | null;
  status: "diproses" | "pending" | "ditolak" | "selesai";
  image: string;
  category_name: string;
  username: string;
  created_at: string;
  user_id: number;
  category_id: number;
};

export type TabItem = {
  icon: string | null;
  label: string;
  active: boolean;
  route?: string;
};

export const tabs: TabItem[] = [
  {
    icon: "home-outline",
    label: "Beranda",
    active: true,
    route: "/home",
  },
  {
    icon: "map-outline",
    label: "Peta",
    active: false,
    route: "/peta",
  },
  {
    icon: null,
    label: "",
    active: false,
  },
  {
    icon: "document-text-outline",
    label: "Laporan Saya",
    active: false,
    route: "/submission",
  },
  {
    icon: "person-outline",
    label: "Profil",
    active: false,
    route: "/profile",
  },
];
