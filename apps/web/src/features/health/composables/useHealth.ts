import { useQuery } from "@tanstack/vue-query";

import { getHealth } from "../services/health.service";

export function useHealth() {
  return useQuery({ queryKey: ["health"], queryFn: getHealth });
}
