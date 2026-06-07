import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomTab from "@/components/ui/BottomTab";
import { getItem } from "@/types/utils/secureStorage";
import { logout } from "@/types/api/auth";

const menuGroups = [
  {
    title: "Akun",
    items: [
      { icon: "document-text-outline", label: "Laporan Saya", color: "#10b981", bg: "#ecfdf5", route: "/submission" },
      { icon: "notifications-outline", label: "Notifikasi", color: "#3b82f6", bg: "#eff6ff", route: null },
    ],
  },
  {
    title: "Lainnya",
    items: [
      { icon: "shield-checkmark-outline", label: "Privasi & Keamanan", color: "#8b5cf6", bg: "#f5f3ff", route: null },
      { icon: "help-circle-outline", label: "Bantuan", color: "#f59e0b", bg: "#fffbeb", route: null },
      { icon: "information-circle-outline", label: "Tentang Aplikasi", color: "#6b7280", bg: "#f3f4f6", route: null },
    ],
  },
];

export default function ProfileScreen() {
  const [username, setUsername] = useState("Pengguna");
  const [email, setEmail] = useState("-");

  useEffect(() => {
    getItem("token").then((token) => {
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username) setUsername(payload.username);
        if (payload.email) setEmail(payload.email);
      } catch { }
    });
  }, []);

  const initials = username.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>

        <View className="bg-white px-5 pt-5 pb-6 rounded-br-[60px]">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Profil Saya</Text>

          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-20 h-20 rounded-full bg-emerald-500 items-center justify-center shadow-sm">
              <Text className="text-white text-3xl font-bold">{initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">{username}</Text>
              <Text className="text-sm text-gray-400 mt-0.5">{email}</Text>
            </View>
          </View>
        </View>

        {menuGroups.map((group, gi) => (
          <View key={gi} className="mt-3 mx-4">
            <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {group.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              {group.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => item.route && router.push(item.route as any)}
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

        <View className="mx-4 mt-3 mb-2">
          <TouchableOpacity
            onPress={handleLogout}
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