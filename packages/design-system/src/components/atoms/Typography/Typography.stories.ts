import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Heading, Paragraph } from ".";

const meta = {
  title: "Atoms/Typography",
  parameters: { layout: "padded" },
  render: () => ({
    components: { Heading, Paragraph },
    template: `
      <div class="flex max-w-2xl flex-col gap-4">
        <Heading v-for="level in [1, 2, 3, 4, 5, 6]" :key="level" :level="level">
          Heading {{ level }}
        </Heading>
        <Paragraph variant="lead">Lead paragraph, used for introductions.</Paragraph>
        <Paragraph>Body paragraph with the default text style.</Paragraph>
        <Paragraph variant="small">Small text</Paragraph>
        <Paragraph variant="muted">Muted text for secondary information.</Paragraph>
      </div>`,
  }),
} satisfies Meta;

export default meta;
export const Overview: StoryObj<typeof meta> = {};
