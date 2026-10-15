<script setup lang="ts">
import { useId } from "vue";

import { Button } from "../../atoms";

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
  }>(),
  {
    description: undefined,
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    destructive: false,
  },
);

const emit = defineEmits<{ confirm: []; cancel: [] }>();

const open = defineModel<boolean>("open", { default: false });
const titleId = useId();

function cancel() {
  open.value = false;
  emit("cancel");
}

function confirm() {
  open.value = false;
  emit("confirm");
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
    @keydown.esc="cancel"
  >
    <div
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      class="w-full max-w-md rounded-control bg-background p-6 shadow-lg"
    >
      <h2 :id="titleId" class="text-lg font-semibold text-foreground">{{ title }}</h2>
      <p v-if="description" class="mt-2 text-sm text-muted-foreground">{{ description }}</p>
      <div class="mt-6 flex justify-end gap-2">
        <Button variant="outline" @click="cancel">{{ cancelLabel }}</Button>
        <Button :variant="destructive ? 'destructive' : 'primary'" @click="confirm">
          {{ confirmLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
