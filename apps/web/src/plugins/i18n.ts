import { DEFAULT_LOCALE, FALLBACK_LOCALE, messages, type MessageSchema } from "@boilerplate/i18n";
import { createI18n } from "vue-i18n";

export const i18n = createI18n<[MessageSchema], "it" | "en", false>({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages,
});
