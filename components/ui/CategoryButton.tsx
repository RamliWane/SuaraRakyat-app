import { View, ScrollView, TextInput } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const categories = [
    { icon: "construct-outline", label: "Semua", bg: "#fff7ed", color: "#ea580c" },
    { icon: "construct-outline", label: "Infrastruktur", bg: "#fff7ed", color: "#ea580c" },
    { icon: "leaf-outline", label: "Lingkungan", bg: "#f0fdf4", color: "#16a34a" },
    { icon: "medical-outline", label: "Keamanan", bg: "#fef2f2", color: "#dc2626" },
    { icon: "school-outline", label: "Pendidikan", bg: "#eff6ff", color: "#2563eb" }
];

export default function CategoryButton(){
    return (
        <View>
            <View className="px-2 flex-row justify-between items-center mb-3">
                <Text className="text-[14px] font-semibold text-white">Kategori</Text>
                <Text className="text-[12px] text-white">Lihat semua</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5, gap: 12 }}
                className="mb-2"
            >
                {categories.map((c) => (
                    <TouchableOpacity key={c.label} className="items-center bg-white rounded-xl px-3 py-3 border border-gray-200">
                        <View 
                            className="w-14 h-14 rounded-xl items-center justify-center" 
                            style={{ backgroundColor: c.bg }}
                        >
                        </View>
                        <Text className="text-[11px] font-medium text-gray-600 text-center">{c.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}