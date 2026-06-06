// components/FormLaporan.tsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  Image, Alert, ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createClient } from "@supabase/supabase-js";
import { createReport } from "@/types/api/reports";
import { router } from "expo-router";

console.log("URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log("KEY:", process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET = "laporan-images";

const KATEGORI_LIST = [
  { label: "Infrastruktur", id: 1 },
  { label: "Lingkungan",    id: 2 },
  { label: "Kesehatan",     id: 3 },
  { label: "Pendidikan",    id: 4 },
  { label: "Korupsi",       id: 5 },
  { label: "Hukum",         id: 6 },
];

const URGENSI_LIST = [
  { label: "Tinggi", value: "tinggi" as const, icon: "flame-outline" as const,             color: "#ef4444", bg: "#fff1f2", border: "#fca5a5" },
  { label: "Sedang", value: "sedang" as const, icon: "alert-circle-outline" as const,      color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d" },
  { label: "Rendah", value: "rendah" as const, icon: "checkmark-circle-outline" as const,  color: "#22c55e", bg: "#f0fdf4", border: "#86efac" },
];

function SectionHeader({ icon, label }: { icon: any; label: string }) {
  return (
    <View>
      <View className="flex-row items-center gap-2 px-4 py-3">
        <Ionicons name={icon} size={14} color="#9ca3af" />
        <Text className="text-xs font-bold tracking-widest text-gray-400 uppercase">{label}</Text>
      </View>
      <View className="h-px bg-gray-100" />
    </View>
  );
}

interface FormLaporanProps {
  onSubmit?: (data: any) => void;
}

export default function FormLaporan({ onSubmit }: FormLaporanProps) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [images, setImages]         = useState<{ uri: string; uploading: boolean; url: string | null }[]>([]);
  const [judul, setJudul]           = useState("");
  const [deskripsi, setDeskripsi]   = useState("");
  const [selectedKategori, setSelectedKategori] = useState(KATEGORI_LIST[0]);
  const [selectedUrgensi, setSelectedUrgensi]   = useState("");
  const [alamat, setAlamat]         = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isUploading = images.some((img) => img.uploading);

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert("Batas Foto", "Maksimal 3 foto.");
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin Ditolak", "Izin akses galeri diperlukan.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (result.canceled) return;

    const uri = result.assets[0].uri;
    const index = images.length;
    setImages((prev) => [...prev, { uri, uploading: true, url: null }]);

    try {
      const blob = await (await fetch(uri)).blob();
      const ext = uri.split(".").pop() ?? "jpg";
      const fileName = `report_${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, blob, { contentType: `image/${ext}` });
      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      setImages((prev) =>
        prev.map((img, i) => i === index ? { ...img, uploading: false, url: data.publicUrl } : img)
      );
    } catch (err: any) {
      Alert.alert("Upload Gagal", err.message);
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
  setCoords(latlng);
  // Reverse geocoding pakai nominatim (gratis)
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
    );
    const data = await res.json();
    setAlamat(data.display_name ?? "");
  } catch {
    setAlamat(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
  }
};

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleKirim = async () => {
    if (!judul.trim())    return Alert.alert("Lengkapi Form", "Judul wajib diisi.");
    if (!deskripsi.trim()) return Alert.alert("Lengkapi Form", "Deskripsi wajib diisi.");
    if (!selectedUrgensi) return Alert.alert("Lengkapi Form", "Pilih tingkat urgensi.");
    if (!alamat.trim())   return Alert.alert("Lengkapi Form", "Alamat wajib diisi.");
    if (isUploading)      return Alert.alert("Mohon Tunggu", "Foto sedang diupload...");

    const imageUrl = images[0]?.url ?? "no-image.jpg";

    try {
      setSubmitting(true);
      const payload = {
        judul:       judul.trim(),
        deskripsi:   deskripsi.trim(),
        lokasi:      alamat.trim(),
        urgensi:     selectedUrgensi as "rendah" | "sedang" | "tinggi",
        category_id: selectedKategori.id,
        image:       imageUrl,
      };
      await createReport(payload);
      onSubmit?.(payload); // kasih tau parent kalau mau handle sendiri
      Alert.alert("Berhasil!", "Laporan kamu sudah terkirim.", [
        { text: "OK", onPress: () => router.replace("/home") },
      ]);
    } catch (err: any) {
      Alert.alert("Gagal Kirim", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white pb-8">

      {/* ── Foto Bukti ── */}
      <SectionHeader icon="image-outline" label="Foto Bukti" />
      <View className="flex-row gap-3 px-4 py-4">
        {images.length < 3 && (
          <TouchableOpacity
            onPress={pickImage}
            className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center"
          >
            <Ionicons name="camera-outline" size={22} color="#9ca3af" />
            <Text className="text-gray-400 text-[10px] mt-0.5">Tambah</Text>
          </TouchableOpacity>
        )}

        {images.map((img, i) => (
          <View key={i} style={{ position: "relative", width: 80, height: 80 }}>
            <Image source={{ uri: img.uri }} style={{ width: 80, height: 80, borderRadius: 12 }} resizeMode="cover" />
            {img.uploading && (
              <View style={{ position: "absolute", inset: 0, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="small" color="white" />
              </View>
            )}
            {!img.uploading && (
              <TouchableOpacity
                onPress={() => removeImage(i)}
                style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: 10, backgroundColor: "#6b7280", alignItems: "center", justifyContent: "center" }}
              >
                <Ionicons name="close" size={12} color="white" />
              </TouchableOpacity>
            )}
            {img.url && !img.uploading && (
              <View style={{ position: "absolute", bottom: 4, right: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="checkmark" size={10} color="white" />
              </View>
            )}
          </View>
        ))}

        {Array.from({ length: Math.max(0, 2 - images.length) }).map((_, i) => (
          <View key={`ph-${i}`} style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: "#f3f4f6", borderWidth: 1, borderColor: "#e5e7eb", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="image-outline" size={24} color="#d1d5db" />
          </View>
        ))}
      </View>

      {/* ── Detail Laporan ── */}
      <SectionHeader icon="document-text-outline" label="Detail Laporan" />
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

      {/* ── Kategori ── */}
      <SectionHeader icon="grid-outline" label="Kategori" />
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

      {/* ── Urgensi ── */}
      <SectionHeader icon="alert-outline" label="Tingkat Urgensi" />
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

      {/* ── Lokasi ── */}
      <SectionHeader icon="location-outline" label="Lokasi Kejadian" />
      <View className="px-4 py-4 gap-3">
        <View>
          <View className="flex-row items-center gap-1.5 mb-2">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-sm font-medium text-gray-700">Alamat</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 12 }}>
            <TextInput
              value={alamat}
              onChangeText={setAlamat}
              placeholder="Masukkan alamat kejadian..."
              placeholderTextColor="#9ca3af"
              style={{ flex: 1, paddingVertical: 12, fontSize: 14, color: "#1f2937" }}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{ width: "100%", height: 140, backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 12, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
            <Ionicons name="location" size={26} color="white" />
          </View>
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#15803d" }}>Pilih lokasi di peta</Text>
          <Text style={{ fontSize: 11, color: "#4ade80", marginTop: 2 }}>Tap untuk membuka peta</Text>
        </TouchableOpacity>
      </View>

      {/* Info box */}
      <View className="mx-4 mb-4">
        <View style={{ backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
          <Ionicons name="information-circle" size={18} color="#16a34a" style={{ marginTop: 1 }} />
          <Text style={{ fontSize: 12, color: "#15803d", flex: 1, lineHeight: 18 }}>
            Laporan dengan foto dan deskripsi lengkap lebih cepat ditindaklanjuti oleh instansi terkait.
          </Text>
        </View>
      </View>

      {/* Tombol Kirim */}
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