<script setup lang="ts">
import { Badge } from "@boilerplate/design-system";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { useHealth } from "../composables/useHealth";

const { t } = useI18n();
const { isSuccess, isError } = useHealth();

const variant = computed(() =>
  isSuccess.value ? "success" : isError.value ? "destructive" : "neutral",
);
const status = computed(() =>
  isSuccess.value ? t("health.ok") : isError.value ? t("health.offline") : t("common.loading"),
);
</script>

<template>
  <Badge :variant="variant">{{ t("health.label", { status }) }}</Badge>
</template>
