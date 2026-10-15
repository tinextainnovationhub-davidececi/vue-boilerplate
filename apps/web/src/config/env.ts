import { z } from "zod";

export const envSchema = z.object({
  BASE_URL: z.string(),
  VITE_API_BASE_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
}

const envs: Env = result.data;

export default envs;
