import type { Meta, StoryObj } from "@storybook/vue3-vite";

import SearchInput from "./SearchInput.vue";

const meta = {
  title: "Molecules/SearchInput",
  component: SearchInput,
  args: { placeholder: "Cerca…", submitLabel: "Cerca" },
} satisfies Meta<typeof SearchInput>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
