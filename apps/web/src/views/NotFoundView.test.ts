import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";

import { i18n } from "@/plugins/i18n";

import NotFoundView from "./NotFoundView.vue";

describe("NotFoundView", () => {
  it("mostra il titolo tradotto e il link alla home", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/", component: { template: "<div />" } }],
    });
    const wrapper = mount(NotFoundView, { global: { plugins: [i18n, router] } });

    expect(wrapper.get("h1").text()).toBe("Pagina non trovata");
    expect(wrapper.get("a").attributes("href")).toBe("/");
  });
});
