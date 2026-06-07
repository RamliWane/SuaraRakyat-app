import { useEffect, useState } from "react";
import { StatusBar, FlatList, ActivityIndicator, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getItem } from "@/types/utils/secureStorage";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CategoryButton from "@/components/ui/CategoryButton";
import ReportCard from "@/components/ReportCard";
import BottomTab from "@/components/ui/BottomTab";
import { getAllReports } from "@/types/api/reports";
import { Report } from "@/types/report";

export default function HomeScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Pengguna");

  useEffect(() => {
    getItem("token").then((token) => {
      if (!token) {
        router.replace("/auth/login");
        return;
      }
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("JWT payload:", payload); // liat di console field apa aja yang ada
        if (payload.username) setUsername(payload.username);
      } catch {}
    });

    getAllReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="bg-[#A2CB8B] px-5 pt-4 pb-3 rounded-bl-[60px]">

        {/* TOP BAR */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-emerald-600 items-center  justify-center">
              <Text className="text-white font-semibold">{initials}</Text>
            </View>
            <View>
              <Text className="text-xs text-gray-500">Selamat datang 👋</Text>
              <Text className="text-base font-semibold text-gray-900">{username}</Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity className="w-9 h-9 bg-white border border-gray-200 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={18} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity className="w-9 h-9 bg-white border border-gray-200 rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CATEGORY */}
        <CategoryButton />
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReportCard report={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-gray-400">Belum ada laporan</Text>
            </View>
          }
        />
      )}

      <BottomTab />
    </SafeAreaView>
  );
}