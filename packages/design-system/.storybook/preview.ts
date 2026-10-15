import type { Preview } from "@storybook/vue3-vite";

import "./preview.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "centered" },
};

export default preview;
