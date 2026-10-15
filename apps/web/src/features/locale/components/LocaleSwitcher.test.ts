import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, it } from "vitest";

import { i18n } from "@/plugins/i18n";

import LocaleSwitcher from "./LocaleSwitcher.vue";

describe("LocaleSwitcher", () => {
  it("cambia la lingua corrente al click", async () => {
    const wrapper = mount(LocaleSwitcher, { global: { plugins: [createPinia(), i18n] } });

    await wrapper.findAll("button")[1]!.trigger("click");

    expect(i18n.global.locale.value).toBe("en");
  });
});
