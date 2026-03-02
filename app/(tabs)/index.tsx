import { Image } from "expo-image";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, Bookmark } from "lucide-react-native";
import { router } from "expo-router";
import data from "../../data.json";


export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-10 gap-3">
          <View className="px-5 flex-row justify-between">
            <Image
              source={require("../../assets/profile.jpeg")}
              className="w-20 h-20 rounded-full"
            />
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Bookmark size={20} color="#0F172A" fill="#0F172A" />
              </TouchableOpacity>
          </View>

          <View className="px-5">
            <Text className="text-white text-xl font-bold">
              Hello! Ramli Silawane
            </Text>
          </View>

          <View className="px-5">
            <View className="flex-row items-center bg-white rounded-xl px-4 py-1 shadow-lg">
              <TextInput
                className="bg-white/10 rounded-xl px-4 py-3 text-black"
                placeholder="Search Here"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View className="bg-gray-300 w-[92%] h-px mx-5" />

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

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}