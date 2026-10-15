import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

import { i18n } from "@/plugins/i18n";

import HealthBadge from "./HealthBadge.vue";

vi.mock("../composables/useHealth", () => ({
  useHealth: () => ({ isSuccess: ref(true), isError: ref(false) }),
}));

describe("HealthBadge", () => {
  it("mostra lo stato operativo quando l'API risponde", () => {
    const wrapper = mount(HealthBadge, { global: { plugins: [i18n] } });

    expect(wrapper.text()).toBe("API: Operativa");
    expect(wrapper.classes()).toContain("bg-success");
  });
});
