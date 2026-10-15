<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";

const { t } = useI18n();

useTitle(() => t("common.appName"));
</script>

<template>
  <RouterView />
</template>
