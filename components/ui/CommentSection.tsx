import { useEffect, useRef, useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, FlatList,
    Modal, Animated, Keyboard, ActivityIndicator,
    KeyboardAvoidingView, Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCommentsByReportId, createComment } from "@/types/api/comments";

interface Comment {
    id: number;
    body: string;
    username: string;
    created_at: string;
}

interface CommentSheetProps {
    visible: boolean;
    reportId: number;
    onClose: () => void;
}

export default function CommentSection({ visible, reportId, onClose }: CommentSheetProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const slideAnim = useRef(new Animated.Value(600)).current;

    useEffect(() => {
        if (visible) {
            fetchComments();
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 600,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getCommentsByReportId(reportId);
            setComments(data ?? []);
        } catch { }
        finally { setLoading(false); }
    };

    const handleSend = async () => {
        if (!text.trim()) return;
        setSending(true);
        try {
            await createComment(reportId, text.trim());
            setText("");
            Keyboard.dismiss();
            await fetchComments();
        } catch { }
        finally { setSending(false); }
    };

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <Animated.View
                    className="rounded-t-3xl"
                    style={{ height: "75%", backgroundColor: "#fff", transform: [{ translateY: slideAnim }] }}
                >
                    <KeyboardAvoidingView
                        className="flex-1"
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        {/* Handle */}
                        <View className="items-center pt-3 pb-2">
                            <View className="w-9 h-1 rounded-full bg-gray-200" />
                        </View>

                        {/* Header */}
                        <View className="flex-row items-center justify-between px-4 pb-3 border-b border-gray-100">
                            <Text className="text-[15px] font-semibold text-gray-900">
                                Komentar {comments.length > 0 ? `(${comments.length})` : ""}
                            </Text>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="close" size={22} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        {/* List */}
                        {loading ? (
                            <View className="flex-1 items-center justify-center">
                                <ActivityIndicator color="#22c55e" />
                            </View>
                        ) : (
                            <FlatList
                                data={comments}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ padding: 16, gap: 16 }}
                                style={{ flex: 1, marginLeft: 10, gap: 16 }}
                                ListEmptyComponent={
                                    <View className="items-center mt-10">
                                        <Ionicons name="chatbubble-outline" size={40} color="#d1d5db" />
                                        <Text className="text-gray-400 mt-2">Belum ada komentar</Text>
                                    </View>
                                }
                                renderItem={({ item }) => {
                                    const initials = item.username?.slice(0, 2).toUpperCase() ?? "??";
                                    return (
                                            <View className="flex-row gap-3">
                                                <View className="w-9 h-9 rounded-full bg-emerald-500 items-center justify-center shrink-0">
                                                    <Text className="text-white font-bold text-xs">{initials}</Text>
                                                </View>
                                                <View className="flex-1">
                                                    <View className="flex-row items-center gap-1.5">
                                                        <Text className="font-semibold text-[13px] text-gray-900">{item.username}</Text>
                                                        <Text className="text-[11px] text-gray-400">
                                                            {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                                                        </Text>
                                                    </View>
                                                    <Text className="text-[13px] text-gray-700 mt-0.5 leading-5">{item.body}</Text>
                                                </View>
                                            </View>
                                    );
                                }}
                            />
                        )}

                       {/* Input */}
                        <View className="flex-row items-center gap-3 px-4 py-3 border-t border-gray-100">
                        <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4">
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                placeholder="Tulis komentar..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!text.trim() || sending}
                            className={`w-9 h-9 rounded-full items-center justify-center ${text.trim() ? "bg-emerald-500" : "bg-gray-200"}`}
                        >
                            {sending
                            ? <ActivityIndicator size="small" color="white" />
                            : <Ionicons name="send" size={15} color={text.trim() ? "white" : "#9ca3af"} />
                            }
                        </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Animated.View>
            </View>
        </Modal>
    );
};