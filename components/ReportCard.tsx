import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Report } from "@/types/report";
import { avatarColors } from "@/constants/avatarColors";
import StatusBadge from "./ui/StatusBadge";
import CategoryBadge from "./ui/CategoryBadge";
import UrgencyBadge from "./ui/UrgensiBadge";

export default function ReportCard({ report }: { report: Report }) {
  const bgColor = avatarColors[report.avatar] ?? "#6b7280";

  return (
    <View className="bg-white mb-2 border-b border-gray-100">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: bgColor }}>
            <Text className="text-white font-bold text-base">{report.avatar}</Text>
          </View>
          <View>
            <Text className="font-semibold text-gray-900 text-sm">{report.author}</Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              <Ionicons name="location-outline" size={11} color="#9ca3af" />
              <Text className="text-gray-400 text-xs">{report.location}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="p-1">
          <Feather name="more-horizontal" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between px-4 pb-2">
        <CategoryBadge label={report.category} />
        <StatusBadge status={report.status} />
      </View>

      <View className="mx-4 h-44 bg-gray-100 rounded-xl items-center justify-center border border-gray-200">
        <Ionicons name="image-outline" size={36} color="#d1d5db" />
        <Text className="text-gray-300 text-sm mt-1">Tidak ada foto</Text>
      </View>

      <View className="flex-row items-center gap-4 px-4 pt-3 pb-1">
        <TouchableOpacity>
          <Ionicons name="arrow-up" size={20} color="#ef4444" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={18} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={18} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <Text className="px-4 text-sm font-semibold text-gray-800">{report.upvotes} dukungan</Text>

      {report.urgency && (
        <View className="px-4 mt-1">
          <UrgencyBadge label={report.urgency} />
        </View>
      )}

      <View className="px-4 pt-1 pb-3">
        <Text className="text-gray-900 font-semibold text-sm leading-5" numberOfLines={2}>
          {report.title}
        </Text>
        <Text className="text-gray-500 text-xs mt-1 leading-4" numberOfLines={2}>
          {report.description}
        </Text>
        <Text className="text-gray-400 text-xs mt-2">{report.timeAgo}</Text>
      </View>
    </View>
  );
}