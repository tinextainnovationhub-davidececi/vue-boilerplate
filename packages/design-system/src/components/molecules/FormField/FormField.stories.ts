import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Input } from "../../atoms";
import FormField from "./FormField.vue";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  args: { label: "Email" },
  render: (args) => ({
    components: { FormField, Input },
    setup: () => ({ args }),
    template: `
      <FormField v-bind="args" v-slot="{ id, invalid }">
        <Input :id="id" :invalid="invalid" placeholder="nome@example.com" />
      </FormField>`,
  }),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Non condivideremo la tua email." } };
export const WithError: Story = { args: { error: "Email non valida" } };
