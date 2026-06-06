// types/api/client.ts
import { getItem } from "@/types/utils/secureStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Request failed");

  return json;
}