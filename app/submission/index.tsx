import { useEffect, useState } from "react";
import { StatusBar, FlatList, ActivityIndicator, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getItem } from "@/types/utils/secureStorage";
import ReportCard from "@/components/ReportCard";
import BottomTab from "@/components/ui/BottomTab";
import { getMyReports } from "@/types/api/reports";
import { Report } from "@/types/report";

export default function SubmissionScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem("token").then((token) => {
      if (!token) router.replace("/auth/login");
    });

    getMyReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
        <Text className="text-lg font-bold text-gray-900">Laporan Saya</Text>
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