<script setup lang="ts">
import { Button } from "@boilerplate/design-system";
import { SUPPORTED_LOCALES } from "@boilerplate/i18n";

import { useLocaleStore } from "../stores/locale.store";

const localeStore = useLocaleStore();
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      v-for="locale in SUPPORTED_LOCALES"
      :key="locale"
      size="sm"
      :variant="localeStore.current === locale ? 'primary' : 'outline'"
      @click="localeStore.setLocale(locale)"
    >
      {{ locale.toUpperCase() }}
    </Button>
  </div>
</template>
