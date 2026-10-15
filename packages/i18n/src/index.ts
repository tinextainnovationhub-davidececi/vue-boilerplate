import type { Locale } from "@boilerplate/types";

import en from "./locales/en.json";
import it from "./locales/it.json";

export const DEFAULT_LOCALE: Locale = "it";
export const FALLBACK_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: readonly Locale[] = ["it", "en"];

/** Messages for vue-i18n's `createI18n({ messages })`. `it` is the source of the schema. */
export const messages = { it, en };

export type MessageSchema = typeof it;

export function isLocale(value: unknown): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
