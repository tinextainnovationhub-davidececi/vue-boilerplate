<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { headingVariants, type HeadingLevel, type HeadingTag } from "./variants";

const props = withDefaults(
  defineProps<{
    level?: HeadingLevel;
    as?: HeadingTag;
    class?: HTMLAttributes["class"];
  }>(),
  { level: 1, as: undefined, class: undefined },
);

const tag = computed(() => props.as ?? `h${props.level}`);
const classes = computed(() => cn(headingVariants({ level: props.level }), props.class));
</script>

<template>
  <component :is="tag" :class="classes"><slot /></component>
</template>
