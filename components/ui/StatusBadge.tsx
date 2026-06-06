import { Text } from "react-native";
import { Report } from "@/types/report";

export default function StatusBadge({ status }: { status: Report["status"] }) {
  const colors: Record<Report["status"], string> = {
    diproses: "#3b82f6",
    selesai: "#10b981",
    ditolak: "#ef4444",
    pending: "#f59e0b",
  };
  return (
    <Text style={{ color: colors[status], fontSize: 13, fontWeight: "600" }}>
      {status}
    </Text>
  );
}