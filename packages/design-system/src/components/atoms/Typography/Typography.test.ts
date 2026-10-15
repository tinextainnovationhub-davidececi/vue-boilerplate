import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Heading, Paragraph } from ".";

describe("Heading", () => {
  it("renders h1 by default", () => {
    expect(mount(Heading, { slots: { default: "Title" } }).element.tagName).toBe("H1");
  });

  it.each([1, 2, 3, 4, 5, 6] as const)("renders h%i for level %i", (level) => {
    const wrapper = mount(Heading, { props: { level } });

    expect(wrapper.element.tagName).toBe(`H${level}`);
  });

  it("allows changing the tag while keeping the level style", () => {
    const wrapper = mount(Heading, { props: { level: 2, as: "h3" } });

    expect(wrapper.element.tagName).toBe("H3");
    expect(wrapper.classes()).toContain("text-3xl");
  });
});

describe("Paragraph", () => {
  it("renders a p with the body variant by default", () => {
    const wrapper = mount(Paragraph, { slots: { default: "Text" } });

    expect(wrapper.element.tagName).toBe("P");
    expect(wrapper.classes()).toContain("text-foreground");
  });

  it("applies the variant and merges custom classes", () => {
    const wrapper = mount(Paragraph, { props: { variant: "muted", class: "text-destructive" } });

    expect(wrapper.classes()).toContain("text-destructive");
    expect(wrapper.classes()).not.toContain("text-muted-foreground");
  });
});
