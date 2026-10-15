import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ConfirmDialog from "./ConfirmDialog.vue";

describe("ConfirmDialog", () => {
  it("non renderizza nulla se chiuso", () => {
    const wrapper = mount(ConfirmDialog, { props: { open: false, title: "Titolo" } });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("emette confirm e si chiude alla conferma", async () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        open: true,
        title: "Titolo",
        confirmLabel: "Sì",
        "onUpdate:open": (v: boolean) => wrapper.setProps({ open: v }),
      },
    });

    await wrapper.findAll("button")[1]!.trigger("click");

    expect(wrapper.emitted("confirm")).toHaveLength(1);
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });
});
