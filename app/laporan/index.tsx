// app/laporan/index.tsx

import FormLaporan from "@/components/FormLaporan";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuatLaporanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-3 border-b border-gray-100 flex-row items-center">
          <Text className="text-lg font-bold text-gray-800">Buat Laporan Keluhan</Text>
        </View>
        <FormLaporan />
      </ScrollView>
    </SafeAreaView>
  );
}