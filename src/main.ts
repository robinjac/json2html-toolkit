import "./style.css";
import { mount, type JSONValue } from "./jsonToDom.ts";

const files = import.meta.glob<{ default: JSONValue }>("../test/*.json");
const div = document.getElementById("app")!;

// Styling like chat gpt json print 🤘
const styling = {
  properties: "#df3079",
  number: "#df3079",
  string: "#00a67d",
  null: "#2e95d3",
  boolean: "#2e95d3",
  braces: "#d9d9e3",
  brackets: "#d9d9e3",
  comma: "#d9d9e3",
  semi: "#d9d9e3",
};

Object.keys(files).forEach(async (path, i) => {
  const module = await files[path]();

  div.insertAdjacentHTML("beforeend", `<div id="c${i + 1}" class="container"></div>`);

  // Test to change prefix, default is json-to-dom
  mount(`#c${i + 1}`, module.default, { styling, prefixCssVariables: "hello-world" });
});
