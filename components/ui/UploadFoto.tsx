import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createClient } from "@supabase/supabase-js";
import HeaderBikinLaporan from "./HeaderBikinLaporan";
import { Dispatch, SetStateAction } from "react";


const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
const BUCKET = "laporan-images";

export type ImageItem = { uri: string; uploading: boolean; url: string | null };


interface FotoPickerProps {
  images: ImageItem[];
  onChange: Dispatch<SetStateAction<ImageItem[]>>;
}

export default function UploadFoto({ images, onChange }: FotoPickerProps) {
  const pickImage = async () => {
    if (images.length >= 3) return Alert.alert("Batas Foto", "Maksimal 3 foto.");

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return Alert.alert("Izin Ditolak", "Izin akses galeri diperlukan.");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (result.canceled) return;

    const uri = result.assets[0].uri;
    const index = images.length;
    onChange([...images, { uri, uploading: true, url: null }]);

    try {
      const blob = await (await fetch(uri)).blob();
      const uriParts = uri.split(".");
        const ext = uriParts.length > 1 ? uriParts.pop()! : "jpg";
        const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext.toLowerCase()) ? ext.toLowerCase() : "jpg";
        const fileName = `report_${Date.now()}.${safeExt}`;

        const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, blob, { contentType: `image/${safeExt === "jpg" ? "jpeg" : safeExt}` });
      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      onChange(prev => prev.map((img, i) => i === index ? { ...img, uploading: false, url: data.publicUrl } : img));
    } catch (err: any) {
      Alert.alert("Upload Gagal", err.message);
      onChange(prev => prev.filter((_, i) => i !== index));
    }
  };

  const removeImage = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <View>
      <HeaderBikinLaporan icon="image-outline" label="Foto Bukti" />
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
    </View>
  );
}