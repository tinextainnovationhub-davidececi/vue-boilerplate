import { describe, expect, it, vi } from "vitest";

import { createApiClient } from "./client";

describe("createApiClient", () => {
  it("invia il token Bearer e segnala i 401", async () => {
    const onUnauthorized = vi.fn();
    const fetch = vi.fn(async (request: Request) => {
      expect(request.headers.get("Authorization")).toBe("Bearer abc");
      return new Response("{}", { status: 401, headers: { "Content-Type": "application/json" } });
    });
    const client = createApiClient({
      baseUrl: "http://api.test",
      getAccessToken: () => "abc",
      onUnauthorized,
    });

    await client.GET("/health", { fetch });

    expect(onUnauthorized).toHaveBeenCalledOnce();
  });
});
