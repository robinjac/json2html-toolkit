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
        const source = resolve(__dirname, "src", "index.d.ts");
        const destination = resolve(__dirname, "dist", "index.d.ts");

        copyFileSync(source, destination);
      },
    },
  ],
});
