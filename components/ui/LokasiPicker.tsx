import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Coords } from "@/types/map";
import MapPickerModal from "./MapPickerModal";
import HeaderBikinLaporan from "./HeaderBikinLaporan";

interface LokasiPickerProps {
  alamat: string;
  coords: Coords | null;
  onAlamatChange: (val: string) => void;
  onPick: (coords: Coords, alamat: string) => void;
}

export default function LokasiPicker({ alamat, coords, onAlamatChange, onPick }: LokasiPickerProps) {
  const [modalMap, setModalMap] = useState(false);

  return (
    <View>
      <HeaderBikinLaporan icon="location-outline" label="Lokasi Kejadian" />
      <View className="px-4 py-4 gap-3">

        {/* Input alamat */}
        <View>
          <View className="flex-row items-center gap-1.5 mb-2">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-sm font-medium text-gray-700">Alamat</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 12 }}>
            <TextInput
              value={alamat}
              onChangeText={onAlamatChange}
              placeholder="Masukkan alamat kejadian..."
              placeholderTextColor="#9ca3af"
              style={{ flex: 1, paddingVertical: 12, fontSize: 14, color: "#1f2937" }}
            />
          </View>
        </View>

        {/* Tombol buka peta */}
        <TouchableOpacity
          onPress={() => setModalMap(true)}
          activeOpacity={0.85}
          style={{ height: 120, backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 12, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
            <Ionicons name="location" size={22} color="white" />
          </View>
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#15803d" }}>
            {coords ? `📍 ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Pilih lokasi di peta"}
          </Text>
          <Text style={{ fontSize: 11, color: "#4ade80", marginTop: 2 }}>Tap untuk membuka peta</Text>
        </TouchableOpacity>
      </View>

      <MapPickerModal
        visible={modalMap}
        coords={coords}
        onClose={() => setModalMap(false)}
        onPick={(c, a) => {
          onPick(c, a);
          setModalMap(false);
        }}
      />
    </View>
  );
}