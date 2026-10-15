import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Badge from "./Badge.vue";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: ["neutral", "primary", "success", "destructive"] },
  },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { variant: "neutral" } };
export const Success: Story = { args: { variant: "success" } };
export const Destructive: Story = { args: { variant: "destructive" } };
