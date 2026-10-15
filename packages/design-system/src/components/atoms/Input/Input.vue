<script setup lang="ts">
import { computed, type HTMLAttributes, type InputHTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { inputVariants, type InputVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    size?: InputVariants["size"];
    invalid?: boolean;
    type?: InputHTMLAttributes["type"];
    placeholder?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    size: "md",
    invalid: false,
    type: "text",
    placeholder: undefined,
    disabled: false,
    class: undefined,
  },
);

const model = defineModel<string>();

const classes = computed(() =>
  cn(inputVariants({ size: props.size, invalid: props.invalid }), props.class),
);
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="classes"
    :aria-invalid="invalid || undefined"
  />
</template>
