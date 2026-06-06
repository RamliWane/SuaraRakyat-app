    // app/auth/login.tsx

    import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { useState } from "react";
    import { Ionicons } from "@expo/vector-icons";
    import { Image } from "expo-image";
    import { login } from "@/types/api/auth";
    import { router } from "expo-router";

    export default function LoginScreen() {
        const [showPassword, setShowPassword] = useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


    // ganti handler tombol masuk:
    const handleLogin = async () => {
    try {
        await login(email, password);
        router.replace("/home");
    } catch (err: any) {
        Alert.alert("Login gagal", err.message);
    }
    };

        return (
            <SafeAreaView className="flex-1 bg-[#f0fdf4]">
                <StatusBar barStyle="dark-content" />

                <View className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-100 opacity-60" />
                <View className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-emerald-200 opacity-40" />

                <View className="flex-1 justify-center px-6">

                    <View className="items-center mb-8">
                        <View className="w-[60px] h-[60px] rounded-[16px] bg-[#A2CB8B] items-center justify-center mb-3">
                            <Image
                                source={require("../../assets/logo3.png")}
                                className="w-20 h-20 rounded-full"
                            />
                        </View>
                        <Text className="text-[24px] font-semibold text-gray-900">
                            SuaraRakyat
                        </Text>
                        <Text className="text-[14px] text-gray-500 mt-1">
                            Masuk untuk melanjutkan
                        </Text>
                    </View>

                    <View className="bg-white rounded-[20px] p-5 border border-gray-100">

                        <View className="mb-4">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="mail-outline" size={14} color="#9ca3af" />
                                <Text className="text-[12px] font-medium text-gray-700">Email</Text>
                            </View>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Masukkan email kamu"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="h-[46px] bg-gray-50 border border-gray-200 rounded-xl px-4 text-[14px] text-gray-900"
                            />
                        </View>

                       <View className="mb-2">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="lock-closed-outline" size={14} color="#9ca3af" />
                                <Text className="text-[12px] font-medium text-gray-700">Password</Text>
                            </View>
                            <View className="flex-row items-center h-[46px] bg-gray-50 border border-gray-200 rounded-xl px-3">
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Masukkan password kamu"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showPassword}
                                    className="flex-1 text-[14px] h-[46px] text-gray-900"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity className="mb-5 self-end">
                            <Text className="text-[12px] text-[#A2CB8B] font-medium">
                                Lupa password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleLogin}
                            className="h-[46px] bg-[#A2CB8B] rounded-xl flex-row items-center justify-center gap-2 mb-4"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="log-in-outline" size={18} color="white" />
                            <Text className="text-white text-[14px] font-semibold">Masuk</Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="flex-1 h-[0.5px] bg-gray-200" />
                            <Text className="text-[11px] text-gray-400">atau masuk dengan</Text>
                            <View className="flex-1 h-[0.5px] bg-gray-200" />
                        </View>

                        <TouchableOpacity
                            className="h-[44px] border border-gray-200 rounded-xl flex-row items-center justify-center gap-2 bg-white"
                            activeOpacity={0.8}
                        >
                            <Ionicons name="logo-google" size={18} color="#ea4335" />
                            <Text className="text-[13px] font-medium text-gray-700">
                                Lanjutkan dengan Google
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        className="mt-6"
                        onPress={() => router.push("./register")}
                    >
                        <Text className="text-center text-[13px] text-gray-500">
                            Belum punya akun?{" "}
                            <Text className="text-[#A2CB8B] font-semibold">Daftar sekarang</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        );
    }