import createClient, { type Middleware } from "openapi-fetch";

import type { paths } from "./generated/schema";

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | null | undefined;
  onUnauthorized?: () => void;
}

export function createApiClient({ baseUrl, getAccessToken, onUnauthorized }: ApiClientOptions) {
  const client = createClient<paths>({ baseUrl });

  const middleware: Middleware = {
    onRequest({ request }) {
      const token = getAccessToken?.();
      if (token) request.headers.set("Authorization", `Bearer ${token}`);
      return request;
    },
    onResponse({ response }) {
      if (response.status === 401) onUnauthorized?.();
      return response;
    },
  };
  client.use(middleware);

  return client;
}

export type ApiClient = ReturnType<typeof createApiClient>;
