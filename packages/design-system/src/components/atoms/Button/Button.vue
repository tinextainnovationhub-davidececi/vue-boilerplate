<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { buttonVariants, type ButtonVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    type?: ButtonHTMLAttributes["type"];
    class?: HTMLAttributes["class"];
  }>(),
  { variant: "primary", size: "md", type: "button", class: undefined },
);

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
