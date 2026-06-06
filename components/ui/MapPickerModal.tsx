// components/ui/MapPickerModal.tsx (web only)
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Coords } from "@/types/map";
import { useRef } from "react";

interface MapPickerModalProps {
  visible: boolean;
  coords: Coords | null;
  onClose: () => void;
  onPick: (coords: Coords, alamat: string) => void;
}

export default function MapPickerModal({ visible, coords, onClose, onPick }: MapPickerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
        #hint {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: white; padding: 8px 18px; border-radius: 999px;
          font-size: 13px; color: #374151; z-index: 999;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          font-family: sans-serif; white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <div id="hint">Klik lokasi di peta</div>
      <script>
        const map = L.map('map').setView([${coords?.lat ?? -6.2}, ${coords?.lng ?? 106.816}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        let marker = ${coords ? `L.marker([${coords.lat}, ${coords.lng}]).addTo(map)` : "null"};

        map.on('click', async function(e) {
          const { lat, lng } = e.latlng;
          if (marker) marker.remove();
          marker = L.marker([lat, lng]).addTo(map);

          let alamat = lat.toFixed(5) + ', ' + lng.toFixed(5);
          try {
            const res = await fetch(
              'https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json',
              { headers: { 'Accept-Language': 'id' } }
            );
            const data = await res.json();
            if (data.display_name) alamat = data.display_name;
          } catch(e) {}

          window.parent.postMessage(JSON.stringify({ lat, lng, alamat }), '*');
        });
      </script>
    </body>
    </html>
  `;

  // Listen pesan dari iframe
  if (typeof window !== "undefined") {
    window.onmessage = (event) => {
      try {
        const { lat, lng, alamat } = JSON.parse(event.data);
        if (lat && lng) onPick({ lat, lng }, alamat);
      } catch {}
    };
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#e5e7eb" }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>Pilih Lokasi</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* iframe untuk web */}
        <iframe
          ref={iframeRef}
          srcDoc={html}
          style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
        />
      </View>
    </Modal>
  );
}