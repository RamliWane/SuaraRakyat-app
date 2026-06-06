import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderBikinLaporan({ icon, label }: { icon: any; label: string }) {
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