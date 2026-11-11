import { cp, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(root, "dist");
await mkdir(destination, { recursive: true });
for (const name of ["index.html", "confirmation.html", "assets", "js"]) {
  await cp(path.join(root, name), path.join(destination, name), { recursive: true });
}
await mkdir(path.join(destination, "css"), { recursive: true });
for (const name of ["tailwind.css", "custom-styles.css"]) {
  await cp(path.join(root, "css", name), path.join(destination, "css", name));
}
const html = await readFile(path.join(destination, "index.html"), "utf8");
if (!html.includes("<main") || !html.includes("js/landing.js")) {
  throw new Error("The generated landing is incomplete");
}
console.log("Static site prepared in dist; private reports and Git metadata excluded.");
