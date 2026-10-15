<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { textVariants, type TextTag, type TextVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    variant?: TextVariants["variant"];
    as?: TextTag;
    class?: HTMLAttributes["class"];
  }>(),
  { variant: "body", as: "p", class: undefined },
);

const classes = computed(() => cn(textVariants({ variant: props.variant }), props.class));
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
