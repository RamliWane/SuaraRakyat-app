import { useFonts, Kanit_400Regular, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { Text, View, Image, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bookmark } from 'lucide-react-native';

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
            You'r Book Mark
          </Text>
        </View>

        <View className="items-start mt-5 mx-2 bg-white rounded-2xl py-8 px-3 shadow-md">
          <View className="mt-5 ml-5 self-start">
            <Text className="text-2xl font-bold text-[#111827]">
              Ramli Silawane
            </Text>
          </View>

          <View className="bg-gray-700 w-[92%] h-px mx-5 mt-5" />


          <View className="w-full px-4 mt-2 gap-3">
            <TouchableOpacity>
              <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                <Image
                  source={require("../../assets/profile.jpeg")}
                  className="rounded-xl"
                  style={{ width: 90, height: 120 }}
                />
                <View className='flex-col pl-3'>
                  <Text className="text-black text-sm font-bold text-center mb-1">
                    The Minds of Billy Milligan
                  </Text>
                  <Text className="text-black text-base">
                    Daniel Keyes
                  </Text>
                  <Text className="text-black text-base">
                    <Text className="font-bold">Rate</Text> : 4.5
                  </Text>
                  <TouchableOpacity className="w-8 h-8 mt-2 bg-[#0F172A] rounded-[5px] items-center justify-center">
                    <Bookmark size={18} color="white" fill="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                <Image
                  source={require("../../assets/profile.jpeg")}
                  className="rounded-xl"
                  style={{ width: 90, height: 120 }}
                />
                <View className='flex-col pl-3'>
                  <Text className="text-black text-sm font-bold text-center mb-1">
                    The Minds of Billy Milligan
                  </Text>
                  <Text className="text-black text-base">
                    Daniel Keyes
                  </Text>
                  <Text className="text-black text-base">
                    <Text className="font-bold">Rate</Text> : 4.5
                  </Text>
                  <TouchableOpacity className="w-8 h-8 mt-2 bg-[#0F172A] rounded-[5px] items-center justify-center">
                    <Bookmark size={18} color="white" fill="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="flex-row items-center bg-white rounded-xl w-full px-4 py-3 shadow-lg">
                <Image
                  source={require("../../assets/profile.jpeg")}
                  className="rounded-xl"
                  style={{ width: 90, height: 120 }}
                />
                <View className='flex-col pl-3'>
                  <Text className="text-black text-sm font-bold text-center mb-1">
                    The Minds of Billy Milligan
                  </Text>
                  <Text className="text-black text-base">
                    Daniel Keyes
                  </Text>
                  <Text className="text-black text-base">
                    <Text className="font-bold">Rate</Text> : 4.5
                  </Text>
                  <TouchableOpacity className="w-8 h-8 mt-2 bg-[#0F172A] rounded-[5px] items-center justify-center">
                    <Bookmark size={18} color="white" fill="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
