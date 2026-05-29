import { View, Text } from "react-native";

export default function UrgencyBadge({ label }: { label: string }) {
  const isHigh = label === "Urgensi tinggi";
  return (
    <View
      className="rounded px-2 py-0.5 self-start"
      style={{ backgroundColor: isHigh ? "#fef2f2" : "#fffbeb" }}
    >
      <Text className="text-xs font-bold" style={{ color: isHigh ? "#ef4444" : "#f59e0b" }}>
        {label}
      </Text>
    </View>
  );
}