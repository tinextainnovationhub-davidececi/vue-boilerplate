import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false } },
});

export const queryPlugin = { plugin: VueQueryPlugin, options: { queryClient } };
