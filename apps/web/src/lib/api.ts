import { createApiClient } from "@boilerplate/api-client";

import envs from "@/config/env";

/** Single API client instance. Add `getAccessToken` / `onUnauthorized` once auth exists. */
export const api = createApiClient({ baseUrl: envs.VITE_API_BASE_URL });
