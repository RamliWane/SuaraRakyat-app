import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <SafeAreaView className="flex-1 bg-[#f0fdf4]">
            <StatusBar barStyle="dark-content" />

            <View className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-100 opacity-60" />
            <View className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-emerald-200 opacity-40" />

            <ScrollView
                contentContainerClassName="flex-grow justify-center px-6 py-8"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="items-center mb-7">
                    <View className="w-[60px] h-[60px] rounded-[16px] bg-emerald-600 items-center justify-center mb-3">
                        <Image
                            source={require("../../assets/logo3.png")}
                            className="w-20 h-20 rounded-full"
                        />
                    </View>
                    <Text className="text-[20px] font-semibold text-gray-900">
                        Buat akun baru
                    </Text>
                    <Text className="text-[13px] text-gray-500 mt-1">
                        Bergabung dengan SuaraRakyat
                    </Text>
                </View>

                <View className="bg-white rounded-[20px] p-5 border border-gray-100">

                    <View className="mb-4">
                        <View className="flex-row items-center gap-1.5 mb-1.5">
                            <Ionicons name="person-outline" size={13} color="#9ca3af" />
                            <Text className="text-[12px] font-medium text-gray-700">Nama lengkap</Text>
                        </View>
                        <TextInput
                            value={nama}
                            onChangeText={setNama}
                            placeholder="Masukkan nama lengkap"
                            placeholderTextColor="#9CA3AF"
                            autoCapitalize="words"
                            className="h-[44px] bg-gray-50 border border-gray-200 rounded-xl px-4 text-[14px] text-gray-900"
                        />
                    </View>

                    <View className="mb-4">
                        <View className="flex-row items-center gap-1.5 mb-1.5">
                            <Ionicons name="mail-outline" size={13} color="#9ca3af" />
                            <Text className="text-[12px] font-medium text-gray-700">Email</Text>
                        </View>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Masukkan email kamu"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="h-[44px] bg-gray-50 border border-gray-200 rounded-xl px-4 text-[14px] text-gray-900"
                        />
                    </View>

                    <View className="flex-row gap-3 mb-5">
                        <View className="flex-1">
                            <View className="flex-row items-center gap-1.5 mb-1.5">
                                <Ionicons name="lock-closed-outline" size={13} color="#9ca3af" />
                                <Text className="text-[12px] font-medium text-gray-700">Password</Text>
                            </View>
                            <View className="h-[44px] bg-gray-50 border border-gray-200 rounded-xl px-3 flex-row items-center justify-between">
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="••••••"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showPassword}
                                    className="flex-1 text-[13px] text-gray-900"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={16}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="flex-1">
                            <View className="flex-row items-center gap-1.5 mb-1.5">
                                <Ionicons name="checkmark-circle-outline" size={13} color="#9ca3af" />
                                <Text className="text-[12px] font-medium text-gray-700">Konfirmasi</Text>
                            </View>
                            <View className="h-[44px] bg-gray-50 border border-gray-200 rounded-xl px-3 flex-row items-center justify-between">
                                <TextInput
                                    value={confirm}
                                    onChangeText={setConfirm}
                                    placeholder="••••••"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showConfirm}
                                    className="flex-1 text-[13px] text-gray-900"
                                />
                                <TouchableOpacity onPress={() => setShowConfirm(p => !p)}>
                                    <Ionicons
                                        name={showConfirm ? "eye-outline" : "eye-off-outline"}
                                        size={16}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push("./login")}
                        className="h-[46px] bg-emerald-600 rounded-xl flex-row items-center justify-center gap-2 mb-4"
                        activeOpacity={0.85}
                    >
                        <Ionicons name="person-add-outline" size={18} color="white" />
                        <Text className="text-white text-[14px] font-semibold">Daftar sekarang</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-3 mb-4">
                        <View className="flex-1 h-[0.5px] bg-gray-200" />
                        <Text className="text-[11px] text-gray-400">atau daftar dengan</Text>
                        <View className="flex-1 h-[0.5px] bg-gray-200" />
                    </View>

                    <TouchableOpacity
                        className="h-[42px] border border-gray-200 rounded-xl flex-row items-center justify-center gap-2 bg-white"
                        activeOpacity={0.8}
                    >
                        <Ionicons name="logo-google" size={17} color="#ea4335" />
                        <Text className="text-[12px] font-medium text-gray-700">
                            Lanjutkan dengan Google
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-[10px] text-gray-400 mt-3 leading-relaxed">
                    Dengan mendaftar, kamu menyetujui{" "}
                    <Text className="text-emerald-600">Syarat & Ketentuan</Text>
                    {" "}dan{" "}
                    <Text className="text-emerald-600">Kebijakan Privasi</Text> kami.
                </Text>

                <TouchableOpacity
                    className="mt-4"
                    onPress={() => router.push("./login")}
                >
                    <Text className="text-center text-[13px] text-gray-500">
                        Sudah punya akun?{" "}
                        <Text className="text-emerald-600 font-semibold">Masuk sekarang</Text>
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}