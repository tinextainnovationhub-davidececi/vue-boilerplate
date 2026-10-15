import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Input } from "../../atoms";
import FormField from "./FormField.vue";

const mountField = (props: { label: string; error?: string; hint?: string }) =>
  mount(FormField, {
    props,
    slots: {
      default: `<template #default="{ id, invalid }"><input :id="id" :data-invalid="invalid" /></template>`,
    },
    global: { components: { Input } },
  });

describe("FormField", () => {
  it("associa la label al controllo tramite id", () => {
    const wrapper = mountField({ label: "Email" });

    expect(wrapper.get("label").attributes("for")).toBe(wrapper.get("input").attributes("id"));
  });

  it("mostra l'errore al posto del suggerimento", () => {
    const wrapper = mountField({ label: "Email", hint: "Suggerimento", error: "Errore" });

    expect(wrapper.text()).toContain("Errore");
    expect(wrapper.text()).not.toContain("Suggerimento");
  });
});
