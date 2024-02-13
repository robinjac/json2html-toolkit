import { resolve } from "path";
import { defineConfig } from "vite";
import { copyFileSync } from "fs";

export default defineConfig({
  resolve: {
    alias: {
      "json-to-dom": "./src",
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
      name: "copy-declaration-file",
      writeBundle() {
        const source = (file, at) => resolve(__dirname, at || ".", file);
        const destination = (file) => resolve(__dirname, "dist", file);
        const copy = (file) => copyFileSync(source(file), destination(file));

        copyFileSync(source("index.d.ts", "src"), destination("index.d.ts"));
        copy("README.md");
        copy("LICENSE.md");
      },
    },
  ],
});
