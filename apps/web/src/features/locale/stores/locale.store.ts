import { DEFAULT_LOCALE, isLocale } from "@boilerplate/i18n";
import type { Locale } from "@boilerplate/types";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

export const useLocaleStore = defineStore("locale", () => {
  const { locale } = useI18n();
  const current = useStorage<Locale>("locale", DEFAULT_LOCALE);

  if (!isLocale(current.value)) current.value = DEFAULT_LOCALE;
  watch(current, (value) => (locale.value = value), { immediate: true });

  function setLocale(value: Locale) {
    current.value = value;
  }

  return { current, setLocale };
});
