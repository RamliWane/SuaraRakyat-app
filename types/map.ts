// types/map.ts

export interface Coords {
  lat: number;
  lng: number;
}

export interface ReverseGeocodeResult {
  display_name: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    province?: string;
    country?: string;
  };
}