import { describe, expect, it } from "vitest";

import { envSchema } from "./env";

describe("envSchema", () => {
  it("accepts valid environment variables", () => {
    const result = envSchema.safeParse({ BASE_URL: "/", VITE_API_BASE_URL: "http://api.test/v1" });

    expect(result.success).toBe(true);
  });

  it("rejects a missing or malformed API base URL", () => {
    expect(envSchema.safeParse({ BASE_URL: "/" }).success).toBe(false);
    expect(envSchema.safeParse({ BASE_URL: "/", VITE_API_BASE_URL: "not-a-url" }).success).toBe(
      false,
    );
  });
});
