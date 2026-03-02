import { Image } from "expo-image";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Bookmark, Star, ArrowRight } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import data from "../../data.json";

export default function App() {
    const { id } = useLocalSearchParams();
    const buku = data.buku.find((buku: any) => buku.id == id);

    return (
        <SafeAreaView className="flex-1 bg-[#0F172A]">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between items-center px-5 pt-4 pb-2">
                    <TouchableOpacity  className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center" onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center">
                        <Bookmark size={20} color="#0F172A" fill="#0F172A" />
                    </TouchableOpacity>
                </View>

                <View className="items-center py-6">
                    <Image
                        source={{ uri: buku?.gambar }}
                        className="w-48 h-72 rounded-lg shadow-lg"
                        contentFit="cover"
                    />
                </View>

                <View className="items-center px-5 mb-4">
                    <Text className="text-white text-xl font-bold text-center mb-1">
                        {buku?.judul}
                    </Text>
                    <Text className="text-white text-base">
                        {buku?.pengarang}
                    </Text>
                </View>

                <View className="flex-row justify-around px-10 py-4 bg-white mx-5 rounded-lg mb-4">
                    <View className="items-center">
                        <Text className="text-gray-900 text-lg font-bold">4.5</Text>
                        <Text className="text-gray-500 text-xs">Rating</Text>
                    </View>
                    <View className="w-px bg-gray-300" />
                    <View className="items-center">
                        <Text className="text-gray-900 text-lg font-bold">374</Text>
                        <Text className="text-gray-500 text-xs">Jumlah Halaman</Text>
                    </View>
                    <View className="w-px bg-gray-300" />
                    <View className="items-center">
                        <Text className="text-gray-900 text-lg font-bold">IND</Text>
                        <Text className="text-gray-500 text-xs">Bahasa</Text>
                    </View>
                </View>

                <View className="bg-white mx-5 rounded-lg p-5 mb-4">
                    <View className="mb-3">
                        <Text className="text-gray-900 text-sm">
                            <Text className="font-semibold">Penerbit : </Text>
                            <Text className="text-gray-600">{buku?.penerbit}</Text>
                        </Text>
                    </View>
                    <View className="mb-3">
                        <Text className="text-gray-900 text-sm">
                            <Text className="font-semibold">Tahun Terbit : </Text>
                            <Text className="text-gray-600">{buku?.tahunTerbit}</Text>
                        </Text>
                    </View>
                    <View className="mb-3">
                        <Text className="text-gray-900 text-sm">
                            <Text className="font-semibold">ISBN : </Text>
                            <Text className="text-gray-600">{buku?.isbn}</Text>
                        </Text>
                    </View>
                    <View className="mb-3">
                        <Text className="text-gray-900 text-sm">
                            <Text className="font-semibold">Stock : </Text>
                            <Text className="text-gray-600">{buku?.stock}</Text>
                        </Text>
                    </View>
                    <View className="mb-3">
                        <Text className="text-gray-900 text-sm">
                            <Text className="font-semibold">Genre : </Text>
                            <Text className="text-gray-600">{buku?.genre}</Text>
                        </Text>
                    </View>
                    <View className="mt-2">
                        <Text className="text-gray-900 font-semibold text-base mb-2">
                            Description
                        </Text>
                        <Text className="text-gray-600 text-sm leading-5">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam natus beatae et magni pariatur maxime ea minima quidem possimus officiis, culpa tempore, suscipit distinctio fugiat, sapiente exercitationem accusantium inventore id!
                        </Text>
                    </View>
                    <View className="px-5 pb-3 pt-4">
                        <TouchableOpacity className="bg-[#0F172A] py-4 rounded-full items-center">
                            <Text className="text-white font-bold text-base">
                                Start Reading
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-gray-300 w-[90%] h-px mx-5 mt-2 mb-2" />

                <View className="pb-5">

                    <View className="px-5 flex-row items-center justify-between">
                        <Text className="text-white text-xl font-semibold mb-3">
                            Recomended For You
                        </Text>
                        <ArrowRight size={24} color="white" />
                    </View>

                    <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="m-3"
              >
                {data.buku.slice(0, 5).map((item) => (
                  <View className="m-2">
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => router.push(`./detail/${item.id}`)}
                      className="gap-3"
                    >
                      <Image
                        source={{ uri: item.gambar }}
                        className="w-32 h-48 rounded-xl"
                        contentFit="cover"
                      />
                      <Text className="text-white text-center mt-2 w-32 flex-wrap">
                        {item.judul}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

                    <View className="px-5 pt-5 flex-row items-center justify-between">
                        <Text className="text-white text-xl font-semibold mb-3">
                            Most Popular
                        </Text>
                        <ArrowRight size={24} color="white" />
                    </View>
<ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="m-3"
              >
                {data.buku.slice(5, 10).map((item) => (
                  <View className="m-2">
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => router.push(`./detail/${item.id}`)}
                      className="gap-3"
                    >
                      <Image
                        source={{ uri: item.gambar }}
                        className="w-32 h-48 rounded-xl"
                        contentFit="cover"
                      />
                      <Text className="text-white text-center mt-2 w-32 flex-wrap">
                        {item.judul}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}