  import React, { useState } from "react";
  import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import { createReport } from "@/types/api/reports";
  import { router } from "expo-router";
  import { Coords } from "@/types/map";
  import { ImageItem } from "@/components/ui/UploadFoto";
  import UploadFoto from "@/components/ui/UploadFoto";
  import LokasiPicker from "@/components/ui/LokasiPicker";
  import HeaderBikinLaporan from "@/components/ui/HeaderBikinLaporan";
  import Toast from 'react-native-toast-message';


  const KATEGORI_LIST = [
    { label: "Infrastruktur", id: 1 },
    { label: "Lingkungan",    id: 2 },
    { label: "Pendidikan",    id: 3 },
    { label: "Keamanan",      id: 4 },
  ];

  const URGENSI_LIST = [
    { label: "Tinggi", value: "tinggi" as const, icon: "flame-outline" as const,            color: "#ef4444", bg: "#fff1f2", border: "#fca5a5" },
    { label: "Sedang", value: "sedang" as const, icon: "alert-circle-outline" as const,     color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d" },
    { label: "Rendah", value: "rendah" as const, icon: "checkmark-circle-outline" as const, color: "#22c55e", bg: "#f0fdf4", border: "#86efac" },
  ];

  interface FormLaporanProps {
    onSubmit?: (data: any) => void;
  }

  export default function FormLaporan({ onSubmit }: FormLaporanProps) {
    const [coords, setCoords]         = useState<Coords | null>(null);
    const [images, setImages]         = useState<ImageItem[]>([]);
    const [judul, setJudul]           = useState("");
    const [deskripsi, setDeskripsi]   = useState("");
    const [selectedKategori, setSelectedKategori] = useState(KATEGORI_LIST[0]);
    const [selectedUrgensi, setSelectedUrgensi]   = useState("");
    const [alamat, setAlamat]         = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isUploading = images.some((img) => img.uploading);


    const handleKirim = async () => {
      if (!judul.trim())     return Toast.show({ type: "error", text1: "Judul wajib diisi." });
      if (!deskripsi.trim()) return Toast.show({ type: "error", text1: "Deskripsi wajib diisi." });
      if (!selectedUrgensi)  return Toast.show({ type: "error", text1: "Pilih tingkat urgensi." });
      if (!alamat.trim())    return Toast.show({ type: "error", text1: "Alamat wajib diisi." });
      if (isUploading)       return Toast.show({ type: "info", text1: "Foto sedang diupload..." });

      try {
        setSubmitting(true);
        const payload = {
          judul:       judul.trim(),
          deskripsi:   deskripsi.trim(),
          lokasi:      alamat.trim(),
          urgensi:     selectedUrgensi as "rendah" | "sedang" | "tinggi",
          category_id: selectedKategori.id,
          image:       images[0]?.url ?? "no-image.jpg",
          lat:         coords?.lat ?? null,
          lng:         coords?.lng ?? null,
        };
        await createReport(payload);
        onSubmit?.(payload);
        Toast.show({
          type: "success",
          text1: "Laporan berhasil dikirim!",
          text2: "Terima kasih atas laporanmu.",
          visibilityTime: 2000,
          onHide: () => router.replace("/home"),
        });
      } catch (err: any) {
        Toast.show({ type: "error", text1: "Gagal kirim", text2: err.message });
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <View className="flex-1 bg-white pb-8">

        {/* Foto */}
        <UploadFoto images={images} onChange={setImages} />

        {/* Detail */}
        <HeaderBikinLaporan icon="document-text-outline" label="Detail Laporan" />
        <View className="px-4 py-4 gap-4">
          <View>
            <View className="flex-row items-center gap-1.5 mb-2">
              <Ionicons name="text-outline" size={14} color="#6b7280" />
              <Text className="text-sm font-medium text-gray-700">Judul laporan</Text>
            </View>
            <TextInput
              value={judul}
              onChangeText={setJudul}
              placeholder="Jalan berlubang di Jl. Mawar..."
              placeholderTextColor="#9ca3af"
              style={{ borderWidth: 2, borderColor: "#22c55e", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: "#1f2937" }}
            />
          </View>
          <View>
            <View className="flex-row items-center gap-1.5 mb-2">
              <Ionicons name="menu-outline" size={14} color="#6b7280" />
              <Text className="text-sm font-medium text-gray-700">Deskripsi</Text>
            </View>
            <TextInput
              value={deskripsi}
              onChangeText={setDeskripsi}
              placeholder={"Jelaskan kondisi masalah secara detail,\nkapan terjadi, dan dampaknya..."}
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: "#1f2937", height: 100 }}
            />
          </View>
        </View>

        {/* Kategori */}
        <HeaderBikinLaporan icon="grid-outline" label="Kategori" />
        <View className="px-4 py-4 flex-row flex-wrap gap-2">
          {KATEGORI_LIST.map((k) => {
            const active = selectedKategori.id === k.id;
            return (
              <TouchableOpacity
                key={k.id}
                onPress={() => setSelectedKategori(k)}
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: active ? "#22c55e" : "#d1d5db", backgroundColor: active ? "#22c55e" : "#fff" }}
              >
                <Text style={{ fontSize: 13, fontWeight: "500", color: active ? "#fff" : "#374151" }}>{k.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Urgensi */}
        <HeaderBikinLaporan icon="alert-outline" label="Tingkat Urgensi" />
        <View className="px-4 py-4 flex-row gap-3">
          {URGENSI_LIST.map((item) => {
            const active = selectedUrgensi === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                onPress={() => setSelectedUrgensi(item.value)}
                style={{ flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: active ? item.border : "#e5e7eb", backgroundColor: active ? item.bg : "#fff", alignItems: "center", justifyContent: "center", gap: 4 }}
              >
                <Ionicons name={item.icon} size={20} color={active ? item.color : "#9ca3af"} />
                <Text style={{ fontSize: 13, fontWeight: "600", color: active ? item.color : "#6b7280" }}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lokasi */}
        <LokasiPicker
          alamat={alamat}
          coords={coords}
          onAlamatChange={setAlamat}
          onPick={(c, a) => { setCoords(c); setAlamat(a); }}
        />

        {/* Info */}
        <View className="mx-4 mb-4">
          <View style={{ backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
            <Ionicons name="information-circle" size={18} color="#16a34a" style={{ marginTop: 1 }} />
            <Text style={{ fontSize: 12, color: "#15803d", flex: 1, lineHeight: 18 }}>
              Laporan dengan foto dan deskripsi lengkap lebih cepat ditindaklanjuti oleh instansi terkait.
            </Text>
          </View>
        </View>

        {/* Kirim */}
        <TouchableOpacity
          onPress={handleKirim}
          disabled={submitting || isUploading}
          activeOpacity={0.85}
          style={{ marginHorizontal: 16, marginBottom: 8, backgroundColor: submitting || isUploading ? "#86efac" : "#22c55e", paddingVertical: 16, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="send" size={18} color="white" />
              <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>Kirim Laporan</Text>
            </>
          )}
        </TouchableOpacity>

      </View>
    );
  }