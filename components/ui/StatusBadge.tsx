import { Text } from "react-native";
import { Report } from "@/types/report";

export default function StatusBadge({ status }: { status: Report["status"] }) {
  const colors: Record<Report["status"], string> = {
    Diproses: "#3b82f6",
    Selesai: "#10b981",
    Ditolak: "#ef4444",
  };
  return (
    <Text style={{ color: colors[status], fontSize: 13, fontWeight: "600" }}>
      {status}
    </Text>
  );
}