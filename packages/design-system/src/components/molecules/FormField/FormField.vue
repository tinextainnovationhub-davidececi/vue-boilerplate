<script setup lang="ts">
import { useId, type HTMLAttributes } from "vue";

import { cn } from "../../../lib/cn";
import { Label } from "../../atoms";

const props = withDefaults(
  defineProps<{
    label: string;
    hint?: string;
    error?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { hint: undefined, error: undefined, class: undefined },
);

const id = useId();
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5', props.class)">
    <Label :for="id">{{ label }}</Label>
    <!-- The slot receives `id`, `invalid` and `describedby` to wire up to the control. -->
    <slot :id="id" :invalid="!!error" :describedby="`${id}-description`" />
    <p
      v-if="error || hint"
      :id="`${id}-description`"
      :class="error ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'"
    >
      {{ error ?? hint }}
    </p>
  </div>
</template>
