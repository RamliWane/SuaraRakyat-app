import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tabs = [
  { icon: "home-outline", label: "Beranda", active: true },
  { icon: "map-outline", label: "Peta", active: false },
  { icon: null, label: "", active: false },
  { icon: "document-text-outline", label: "Laporan", active: false },
  { icon: "person-outline", label: "Profil", active: false },
];

export default function BottomTab() {
  return (
    <View className="flex-row items-end bg-white border-t border-gray-200 pb-4 pt-2">
      {tabs.map((tab, i) => {
        if (i === 2) {
          return (
            <View key={i} className="flex-1 items-center -mt-6">
              <TouchableOpacity
                className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
                style={{ backgroundColor: "#10b981" }}
              >
                <Ionicons name="add" size={30} color="white" />
              </TouchableOpacity>
            </View>
          );
        }
        return (
          <TouchableOpacity key={i} className="flex-1 items-center gap-0.5">
            <Ionicons name={tab.icon as any} size={22} color={tab.active ? "#10b981" : "#9ca3af"} />
            <Text className="text-xs" style={{ color: tab.active ? "#10b981" : "#9ca3af" }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}