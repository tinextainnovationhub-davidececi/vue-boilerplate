import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ConfirmDialog from "./ConfirmDialog.vue";

const meta = {
  title: "Organisms/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    title: "Eliminare l'elemento?",
    description: "L'operazione non può essere annullata.",
    confirmLabel: "Elimina",
    cancelLabel: "Annulla",
    destructive: true,
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
export const Destructive: StoryObj<typeof meta> = {};
