import { useFonts, Kanit_400Regular, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { Text, View, Image, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
    const [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-[#0F172A]">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                <View className='flex-1 items-center mt-1'>
                    <Text className="mt-5 text-4xl font-bold text-white">
                        About Me
                    </Text>
                </View>

                <View className="items-start mt-5 mx-2 bg-white rounded-2xl py-8 px-3 shadow-md">
                    <Image
                        source={require("../../assets/profile.jpeg")}
                        className="rounded-full"
                        style={{ width: 90, height: 90 }}
                    />

                    <View className="mt-5 ml-5 self-start">
                        <Text className="text-2xl font-bold text-[#111827]">
                            Ramli Silawane
                        </Text>

                        <Text className="text-lg text-gray-600 mt-1">
                            Saya berasal dari Jalan Bungur 2 Di kota Depok
                        </Text>

                        <Text className="text-xl font-bold text-[#111827] mt-5">
                            Asal Sekolah
                        </Text>

                        <Text className="text-lg text-gray-600 mt-1">
                            : SMK Taruna Bhakti
                        </Text>
                    </View>

                    <View className="bg-gray-700 w-[92%] h-px mx-5 mt-5" />


                    <View className="w-full px-4 mt-2">
                         <Text className="text-lg font-bold text-[#111827] mt-5">
                            Name
                        </Text>
                        <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                            <TextInput
                                className="flex-1 text-base text-gray-900"
                                placeholder="Ramli Silawane"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                         <Text className="text-lg font-bold text-[#111827] mt-5">
                            Phone Number
                        </Text>
                        <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                            <TextInput
                                className="flex-1 text-base text-gray-900"
                                placeholder="08......."
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                         <Text className="text-lg font-bold text-[#111827] mt-5">
                            Email
                        </Text>
                        <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                            <TextInput
                                className="flex-1 text-base text-gray-900"
                                placeholder="Ramli@gmail.com"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <TouchableOpacity className="bg-[#0F172A] shadow-xl py-2 m-5 rounded-xl mt-5">
                            <Text className="text-center text-white font-semibold text-lg">
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
