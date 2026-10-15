<script setup lang="ts">
import { Button, Heading } from "@boilerplate/design-system";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <main class="mx-auto flex max-w-xl flex-col items-start gap-4 p-8">
    <Heading :level="1">{{ t("notFound.title") }}</Heading>
    <RouterLink to="/"
      ><Button variant="outline">{{ t("notFound.back") }}</Button></RouterLink
    >
  </main>
</template>
