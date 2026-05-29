import { View, Text } from "react-native";

export default function CategoryBadge({ label }: { label: string }) {
  return (
    <View className="bg-gray-200 rounded px-2 py-0.5 self-start">
      <Text className="text-gray-700 text-xs font-semibold">{label}</Text>
    </View>
  );
}