import { api } from "@/lib/api";

import type { Health } from "../types";

export async function getHealth(): Promise<Health> {
  const { data, error } = await api.GET("/health");
  if (error) throw error;
  return data;
}
