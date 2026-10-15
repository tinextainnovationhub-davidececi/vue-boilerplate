import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Label from "./Label.vue";

const meta = {
  title: "Atoms/Label",
  component: Label,
  render: () => ({ components: { Label }, template: "<Label>Email</Label>" }),
} satisfies Meta<typeof Label>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
