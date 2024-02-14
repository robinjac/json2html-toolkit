import { resolve } from "path";
import { defineConfig } from "vite";
import { copyFileSync, writeFileSync } from "fs";

const packageJson = {
  name: "json2html-toolkit",
  version: "0.0.0", // Todo handle version
  description:
    "Tiny library/tool to print out or insert a json object into the dom 🤘",
  main: "index.js", // Entry point of your package
  types: "index.d.ts",
  keywords: [
    "json",
    "dom",
    "print",
    "object",
    "parser",
    "viewer",
    "formatter",
    "display",
    "visualization",
    "toolkit",
    "utility",
    "json to dom",
    "json as html string",
    "json to html",
    "html",
    "javascript",
    "library",
    "markup",
    "converter",
    "stringify",
  ],
  author: "robinjac",
  license: "MIT",
};

export default defineConfig({
  resolve: {
    alias: {
      "json2html-toolkit": "./src",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src"),
      name: "json-to-dom",
      fileName: "index",
    },
  },
  plugins: [
    {
      name: "copy-files-and-create-package-json",
      writeBundle() {
        const source = (file, at) => resolve(__dirname, at || ".", file);
        const destination = (file) => resolve(__dirname, "dist", file);
        const copy = (file) => copyFileSync(source(file), destination(file));

        copyFileSync(source("index.d.ts", "src"), destination("index.d.ts"));
        copy("README.md");
        copy("LICENSE.md");

        writeFileSync(
          destination("package.json"),
          JSON.stringify(packageJson, null, 2)
        );
      },
    },
  ],
});
