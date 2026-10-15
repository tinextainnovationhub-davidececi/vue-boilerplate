import { existsSync } from "node:fs";
import path from "node:path";

const quote = (file) => JSON.stringify(file);

// ESLint configs live in each workspace, so ESLint must run from the workspace that owns the file.
function eslintByWorkspace(files) {
  const byWorkspace = new Map();

  for (const file of files) {
    const [group, name] = path.relative(process.cwd(), file).split(path.sep);
    const workspace = path.join(group, name);
    if (!existsSync(path.join(workspace, "eslint.config.js"))) continue;
    byWorkspace.set(workspace, [...(byWorkspace.get(workspace) ?? []), file]);
  }

  return [...byWorkspace].map(
    ([workspace, list]) =>
      `pnpm --dir ${quote(workspace)} exec eslint --fix --no-warn-ignored ${list.map(quote).join(" ")}`,
  );
}

export default {
  "{apps,packages}/**/*.{ts,vue,js,mjs,cjs}": (files) => [
    ...eslintByWorkspace(files),
    `prettier --write ${files.map(quote).join(" ")}`,
  ],
  "*.{json,md,css,yml,yaml}": (files) => [`prettier --write ${files.map(quote).join(" ")}`],
};
