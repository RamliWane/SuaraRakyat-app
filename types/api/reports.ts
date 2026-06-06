// types/api/reports.ts
import { apiFetch } from "./client";

export async function getAllReports() {
  const json = await apiFetch("/reporting");
  return json.data;
}

export async function getMyReports() {
  const json = await apiFetch("/reporting/user/me");
  return json.data;
}

export async function getReportById(id: number) {
  const json = await apiFetch(`/reporting/${id}`);
  return json.data;
}

export async function createReport(body: {
  judul: string;
  deskripsi: string;
  lokasi: string;
  urgensi: "rendah" | "sedang" | "tinggi";
  category_id: number;
  image: string;
  lat?: number | null;  
  lng?: number | null;   
}) {
  return apiFetch("/reporting", {
    method: "POST",
    body: JSON.stringify(body),
  });
}