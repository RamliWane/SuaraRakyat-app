import FormLaporan from "@/components/FormLaporan";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BuatLaporanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-3 border-b border-gray-100 flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Buat Laporan Keluhan</Text>
        </View>
        <FormLaporan />
      </ScrollView>
    </SafeAreaView>
  );
}