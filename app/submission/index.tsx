// app/submission/index.tsx
import { useEffect, useState } from "react";
import { StatusBar, FlatList, ActivityIndicator, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import ReportCard from "@/components/ReportCard";
import BottomTab from "@/components/ui/BottomTab";
import { getAllReports } from "@/types/api/reports";
import { Report } from "@/types/report";

export default function HomeScreen() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync("token").then((token) => {
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
            
            <FlatList
                      data={reports}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => <ReportCard report={item} />}
                      contentContainerStyle={{ paddingBottom: 16 }}
                      showsVerticalScrollIndicator={false}
                      className="flex-1"
                      ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-20">
                          <Text className="text-gray-400">Belum ada laporan</Text>
                        </View>
                      }
                    />
            <BottomTab />
        </SafeAreaView>
    );
}