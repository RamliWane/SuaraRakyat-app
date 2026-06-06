// components/ReportCard.tsx

import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Report } from "@/types/report";
import StatusBadge from "./ui/StatusBadge";
import CategoryBadge from "./ui/CategoryBadge";
import UrgencyBadge from "./ui/UrgensiBadge";
import { useState } from "react";
import CommentSheet from "./ui/CommentSection";

export default function ReportCard({ report }: { report: Report }) {
  const [showComments, setShowComments] = useState(false);
  const initials = report.username?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <View className="bg-white mb-2 border-b border-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <View className="flex-row items-center gap-3 flex-1 min-w-0"> {/* ← tambahin flex-1 min-w-0 di sini */}
          <View className="w-10 h-10 rounded-full bg-emerald-500 items-center justify-center shrink-0">
            <Text className="text-white font-bold text-base">{initials}</Text>
          </View>
          <View className="flex-1 min-w-0">
            <Text className="font-semibold text-gray-900 text-sm">{report.username}</Text>
            <View className="flex-row items-start gap-1 mt-0.5">
              <Ionicons name="location-outline" size={11} color="#9ca3af" style={{ marginTop: 2 }} />
              <Text className="text-gray-400 text-xs flex-1">
                {report.lokasi}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="p-1 shrink-0">
          <Feather name="more-horizontal" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Badges */}
      <View className="flex-row items-center justify-between px-4 pb-2">
        <CategoryBadge label={report.category_name} />
        <StatusBadge status={report.status} />
      </View>

      {/* Image */}
      <View className="mx-4 h-44 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
        {report.image && report.image !== "no-image.jpg" ? (
          <>
            {console.log("Image URL:", report.image)}
            <Image
              source={{ uri: report.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </>

        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="image-outline" size={36} color="#d1d5db" />
            <Text className="text-gray-300 text-sm mt-1">Tidak ada foto</Text>
          </View>
        )}
      </View>

      {/* Urgensi */}
      {report.urgensi && (
        <View className="px-4 mt-3">
          <UrgencyBadge label={report.urgensi} />
        </View>
      )}

      {/* Actions */}
      <View className="flex-row gap-4 px-4 pt-4 pb-1">
        <TouchableOpacity className="flex-row items-center gap-1">
          <Ionicons name="arrow-up" size={20} color="#ef4444" />
          <Text className="text-xs text-gray-500">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => setShowComments(true)}
        >
          <Ionicons name="chatbubble-outline" size={18} color="#6b7280" />
          <Text className="text-xs text-gray-500">{report.comment_count ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Ionicons name="share-social-outline" size={18} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <CommentSheet
        visible={showComments}
        reportId={report.id}
        onClose={() => setShowComments(false)}
      />

      <View className="px-4 pt-1 pb-3">
        <Text className="text-gray-900 font-semibold text-sm leading-5" numberOfLines={2}>
          {report.judul}
        </Text>
        <Text className="text-gray-500 text-xs mt-1 leading-4" numberOfLines={2}>
          {report.deskripsi}
        </Text>
        <Text className="text-gray-400 text-xs mt-2">
          {new Date(report.created_at).toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric"
          })}
        </Text>
      </View>
    </View>
  );
}