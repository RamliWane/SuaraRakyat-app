// types/api/storage.ts
import * as ImagePicker from "expo-image-picker";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET = "laporan-images";

export async function pickAndUploadImage(): Promise<string | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") throw new Error("Izin akses galeri ditolak");

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
  });

  if (result.canceled) return null;

  const uri = result.assets[0].uri;
  const response = await fetch(uri);
  const blob = await response.blob();

  const ext = uri.split(".").pop() ?? "jpg";
  const fileName = `report_${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, blob, { contentType: `image/${ext}` });

  if (error) throw new Error("Upload gagal: " + error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}