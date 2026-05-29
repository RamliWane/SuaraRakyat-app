import { View, StatusBar, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "@/components/ui/CategoryButton";
import ReportCard from "@/components/ReportCard";
import { reports } from "@/types/report";
import BottomTab from "@/components/ui/BottomTab";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="px-5 pt-4 pb-3 bg-[#A2CB8B] rounded-b-3xl">

        <View className="flex-row items-center justify-between mb-4">

          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-emerald-600 items-center justify-center">
              <Text className="text-white text-base font-semibold">R</Text>
            </View>
            <View>
              <Text className="text-[12px] text-gray-500">Selamat datang 👋</Text>
              <Text className="text-[16px] font-semibold text-gray-900">Ramli Silawane</Text>
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

        <View className="flex-row items-center gap-2 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 mb-4">
          <Ionicons name="search-outline" size={16} color="#9ca3af" />
          <TextInput
            placeholder="Cari laporan..."
            placeholderTextColor="#9ca3af"
            className="flex-1 text-[13px] text-gray-800"
          />
        </View>

        <CategoryButton />
      </View>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReportCard report={item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />

      <BottomTab />
    </SafeAreaView>
  );
}