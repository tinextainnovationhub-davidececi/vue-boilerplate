<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"] }>(), {
  class: undefined,
});
</script>

<template>
  <label :class="cn('text-sm font-medium text-foreground', props.class)">
    <slot />
  </label>
</template>
