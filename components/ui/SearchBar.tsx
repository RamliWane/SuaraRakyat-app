import { View, TextInput } from "react-native";

export default function SearchBar() {
  return (
    <View className="w-full px-4 py-2">
      <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-lg">
        <TextInput
          className="flex-1 text-base text-gray-900"
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
}