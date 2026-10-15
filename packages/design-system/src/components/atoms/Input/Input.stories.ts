import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Input from "./Input.vue";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: { placeholder: "Scrivi qualcosa…" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
