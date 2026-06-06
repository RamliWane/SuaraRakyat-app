import { Platform, View, Text } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";

interface Props {
  coords: { lat: number; lng: number } | null;
  onMapClick: (coords: { lat: number; lng: number }) => void;
}

export default function PilihLokasi({ coords, onMapClick }: Props) {

  // 🚫 BLOCK WEB (biar ga crash)
  if (Platform.OS === "web") {
    return (
      <View style={{
        height: 200,
        borderRadius: 12,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Text>Map hanya tersedia di mobile</Text>
      </View>
    );
  }

  const handlePress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    onMapClick({
      lat: latitude,
      lng: longitude,
    });
  };

  return (
    <View style={{ height: 200, borderRadius: 12, overflow: "hidden" }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coords?.lat ?? -6.2088,
          longitude: coords?.lng ?? 106.8456,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handlePress}
      >
        {coords && (
          <Marker
            coordinate={{
              latitude: coords.lat,
              longitude: coords.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
}