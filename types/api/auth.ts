// types/api/auth.ts
import { setItem, removeItem } from "@/types/utils/secureStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Login gagal");

  await setItem("token", json.session_token);
  return json;
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Register gagal");

  return json;
}

export async function logout() {
  await removeItem("token");
}