<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { spinnerVariants, type SpinnerVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    size?: SpinnerVariants["size"];
    label?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { size: "md", label: "Loading", class: undefined },
);

const classes = computed(() => cn(spinnerVariants({ size: props.size }), props.class));
</script>

<template>
  <span role="status" :aria-label="label" :class="classes" />
</template>
