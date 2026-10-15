<script setup lang="ts">
import { Heading, Paragraph } from "@boilerplate/design-system";
import { useI18n } from "vue-i18n";

import { HealthBadge } from "@/features/health";
import { LocaleSwitcher } from "@/features/locale";

const { t } = useI18n();
</script>

<template>
  <main class="mx-auto flex max-w-xl flex-col items-start gap-6 p-8">
    <Heading :level="1">{{ t("home.title") }}</Heading>
    <Paragraph variant="lead">{{ t("home.subtitle") }}</Paragraph>
    <LocaleSwitcher />
    <HealthBadge />
  </main>
</template>
