// app/peta/index.tsx
import { useEffect, useState } from "react";
import { View, Text, StatusBar, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "@/components/ui/BottomTab";
import { getAllReports } from "@/types/api/reports";
import { Report } from "@/types/report";

// import WebView hanya di native
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").default;
}

export default function PetaScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReports()
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const markers = reports
    .filter((r) => r.lat && r.lng)
    .map((r) => ({
      lat: r.lat,
      lng: r.lng,
      judul: r.judul,
      lokasi: r.lokasi,
      status: r.status,
      urgensi: r.urgensi,
      category: r.category_name,
    }));

  const STATUS_COLOR: Record<string, string> = {
    pending:  "#f59e0b",
    diproses: "#3b82f6",
    selesai:  "#10b981",
    ditolak:  "#ef4444",
  };

  const URGENSI_COLOR: Record<string, string> = {
    tinggi: "#dc2626",
    sedang: "#f59e0b",
    rendah: "#16a34a",
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #map { height: 100%; width: 100%; }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px; padding: 0; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-content { margin: 0; width: 220px !important; }
        .popup-inner { padding: 12px; font-family: sans-serif; }
        .popup-category { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .popup-judul { font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 4px; line-height: 1.3; }
        .popup-lokasi { font-size: 11px; color: #6b7280; margin-bottom: 8px; line-height: 1.4; }
        .popup-footer { display: flex; align-items: center; justify-content: space-between; }
        .badge { font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 999px; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([-6.2, 106.816], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const markers = ${JSON.stringify(markers)};
        const urgensiColor = ${JSON.stringify(URGENSI_COLOR)};
        const statusColor  = ${JSON.stringify(STATUS_COLOR)};

        markers.forEach(function(r) {
          const color = urgensiColor[r.urgensi] || '#6b7280';
          const icon = L.divIcon({
            className: '',
            html: '<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:' + color + ';border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);"></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -36],
          });

          const sColor = statusColor[r.status] || '#6b7280';
          const uColor = urgensiColor[r.urgensi] || '#6b7280';
          const popup =
            '<div class="popup-inner">' +
              '<div class="popup-category" style="color:' + uColor + '">' + r.category + '</div>' +
              '<div class="popup-judul">' + r.judul + '</div>' +
              '<div class="popup-lokasi">' + r.lokasi + '</div>' +
              '<div class="popup-footer">' +
                '<span class="badge" style="background:' + sColor + '20;color:' + sColor + '">' + r.status + '</span>' +
                '<span class="badge" style="background:' + uColor + '20;color:' + uColor + '">' + (r.urgensi || '-') + '</span>' +
              '</div>' +
            '</div>';

          L.marker([r.lat, r.lng], { icon }).addTo(map).bindPopup(popup, { className: 'custom-popup' });
        });

        if (markers.length > 0) {
          const bounds = markers.map(function(m) { return [m.lat, m.lng]; });
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        }
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="px-5 pt-4 pb-3 border-b border-gray-100 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold text-gray-900">Peta Laporan</Text>
          <Text className="text-xs text-gray-400 mt-0.5">
            {loading ? "Memuat..." : `${markers.length} laporan dengan lokasi`}
          </Text>
        </View>

        <View className="flex-row gap-3">
          {[
            { label: "Tinggi", color: "#dc2626" },
            { label: "Sedang", color: "#f59e0b" },
            { label: "Rendah", color: "#16a34a" },
          ].map((l) => (
            <View key={l.label} className="flex-row items-center gap-1">
              <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              <Text className="text-[10px] text-gray-500">{l.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : Platform.OS === "web" ? (
        <iframe
          srcDoc={html}
          style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
        />
      ) : (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          source={{ html }}
          scrollEnabled={false}
        />
      )}

      <BottomTab />
    </SafeAreaView>
  );
}