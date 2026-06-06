import { apiFetch } from "./client";

export async function getCommentsByReportId(reportId: number) {
  const json = await apiFetch(`/reportcomments/${reportId}/comments`);
  return json.data;
}

export async function createComment(reportId: number, body: string) {
  return apiFetch(`/reportcomments/${reportId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}