import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Spinner from "./Spinner.vue";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Spinner>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
