import { View, Text } from "react-native";
import { Report } from "@/types/report";

const URGENSI_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  tinggi: { label: "Urgensi Tinggi", color: "#ef4444", bg: "#fef2f2" },
  sedang: { label: "Urgensi Sedang", color: "#f59e0b", bg: "#fffbeb" },
  rendah: { label: "Urgensi Rendah", color: "#22c55e", bg: "#f0fdf4" },
};

export default function UrgencyBadge({ label }: { label: Report["urgensi"] }) {
  if (!label) return null;
  const config = URGENSI_CONFIG[label] ?? { label, color: "#6b7280", bg: "#f3f4f6" };

  return (
    <View className="rounded px-2 py-0.5 self-start" style={{ backgroundColor: config.bg }}>
      <Text className="text-xs font-bold" style={{ color: config.color }}>
        {config.label}
      </Text>
    </View>
  );
}