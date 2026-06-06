import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "@/components/ui/BottomTab";

const stats = [
  { label: "Total", value: "12", icon: "document-text-outline", color: "#10b981", bg: "#ecfdf5" },
  { label: "Diproses", value: "8", icon: "time-outline", color: "#3b82f6", bg: "#eff6ff" },
  { label: "Selesai", value: "4", icon: "checkmark-circle-outline", color: "#f59e0b", bg: "#fffbeb" },
];

const menuGroups = [
  {
    title: "Akun",
    items: [
      { icon: "document-text-outline", label: "Laporan Saya", color: "#10b981", bg: "#ecfdf5" },
      { icon: "notifications-outline", label: "Notifikasi", color: "#3b82f6", bg: "#eff6ff" },
    ],
  },
  {
    title: "Lainnya",
    items: [
      { icon: "shield-checkmark-outline", label: "Privasi & Keamanan", color: "#8b5cf6", bg: "#f5f3ff" },
      { icon: "help-circle-outline", label: "Bantuan", color: "#f59e0b", bg: "#fffbeb" },
      { icon: "information-circle-outline", label: "Tentang Aplikasi", color: "#6b7280", bg: "#f3f4f6" },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>

        {/* Hero Card */}
        <View className="bg-white px-5 pt-5 pb-6">
          
          {/* Top label */}
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Profil Saya</Text>

          {/* Avatar + Info */}
          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-20 h-20 rounded-2xl bg-emerald-500 items-center justify-center shadow-sm">
              <Text className="text-white text-3xl font-bold">R</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">Ramli Silawane</Text>
              <Text className="text-sm text-gray-400 mt-0.5">ramli@email.com</Text>
              <View className="flex-row items-center gap-1 mt-2">
                <View className="bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 flex-row items-center gap-1">
                  <Ionicons name="location-outline" size={11} color="#10b981" />
                  <Text className="text-xs text-emerald-600 font-medium">Jakarta Selatan</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            {stats.map((s, i) => (
              <View
                key={i}
                className="flex-1 rounded-2xl p-3 items-center"
                style={{ backgroundColor: s.bg }}
              >
                <View className="w-8 h-8 rounded-full items-center justify-center mb-1.5" style={{ backgroundColor: s.color + "20" }}>
                  <Ionicons name={s.icon as any} size={16} color={s.color} />
                </View>
                <Text className="text-lg font-bold text-gray-900">{s.value}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Groups */}
        {menuGroups.map((group, gi) => (
          <View key={gi} className="mt-3 mx-4">
            <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {group.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              {group.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  className={`flex-row items-center px-4 py-3.5 gap-3 ${i !== group.items.length - 1 ? "border-b border-gray-100" : ""}`}
                  activeOpacity={0.7}
                >
                  <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: item.bg }}>
                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text className="flex-1 text-sm text-gray-800 font-medium">{item.label}</Text>
                  <Ionicons name="chevron-forward" size={15} color="#d1d5db" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View className="mx-4 mt-3 mb-2">
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 py-4 rounded-2xl"
            style={{ backgroundColor: "#fef2f2" }}
            activeOpacity={0.7}
          >
            <View className="w-8 h-8 rounded-xl bg-red-100 items-center justify-center">
              <Ionicons name="log-out-outline" size={17} color="#ef4444" />
            </View>
            <Text className="text-red-500 font-semibold text-sm">Keluar dari Akun</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <BottomTab />
    </SafeAreaView>
  );
}