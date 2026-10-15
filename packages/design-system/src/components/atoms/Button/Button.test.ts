import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Button from "./Button.vue";

describe("Button", () => {
  it('renderizza lo slot con type="button" e variante primaria di default', () => {
    const wrapper = mount(Button, { slots: { default: "Salva" } });

    expect(wrapper.text()).toBe("Salva");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.classes()).toContain("bg-primary");
  });

  it("applica la variante e permette di sovrascrivere le classi", () => {
    const wrapper = mount(Button, { props: { variant: "destructive", class: "bg-success" } });

    expect(wrapper.classes()).toContain("bg-success");
    expect(wrapper.classes()).not.toContain("bg-destructive");
  });
});
