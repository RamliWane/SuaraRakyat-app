// app/home/index.tsx
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

  useEffect(() => {
    getItem("token").then((token) => {
      if (!token) router.replace("/auth/login");
    });

    getAllReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="bg-[#A2CB8B] px-5 pt-4 pb-3">
        
        {/* TOP BAR */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-emerald-600 items-center justify-center">
              <Text className="text-white font-semibold">R</Text>
            </View>

            <View>
              <Text className="text-xs text-gray-500">Selamat datang 👋</Text>
              <Text className="text-base font-semibold text-gray-900">
                Ramli Silawane
              </Text>
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

        {/* SEARCH */}
        <View className="mb-4 flex-row items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={16} color="#9ca3af" />
          <TextInput
            placeholder="Cari laporan..."
            placeholderTextColor="#9ca3af"
            className="flex-1 text-sm text-gray-800"
          />
        </View>

        {/* CATEGORY */}
        <CategoryButton />
      </View>

      {/* ✅ LIST YANG SCROLL */}
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
        />
      )}

      <BottomTab />
    </SafeAreaView>
  );
}