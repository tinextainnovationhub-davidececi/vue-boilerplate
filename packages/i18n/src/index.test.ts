import { describe, expect, it } from "vitest";

import { isLocale, messages } from "./index";

function keys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe("i18n", () => {
  it("mantiene le stesse chiavi in tutte le lingue", () => {
    expect(keys(messages.en).sort()).toEqual(keys(messages.it).sort());
  });

  it("riconosce le lingue supportate", () => {
    expect(isLocale("it")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
