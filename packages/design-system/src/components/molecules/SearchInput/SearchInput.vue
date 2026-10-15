<script setup lang="ts">
import { Button, Input } from "../../atoms";

withDefaults(defineProps<{ placeholder?: string; submitLabel?: string }>(), {
  placeholder: undefined,
  submitLabel: "Search",
});

const emit = defineEmits<{ submit: [query: string] }>();

const query = defineModel<string>({ default: "" });
</script>

<template>
  <form class="flex items-center gap-2" role="search" @submit.prevent="emit('submit', query)">
    <Input v-model="query" type="search" :placeholder="placeholder" class="flex-1" />
    <Button type="submit">{{ submitLabel }}</Button>
  </form>
</template>
