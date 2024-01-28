import "./style.css";
import { mount, type JSONValue } from "./jsonToDom.ts";

const files = import.meta.glob<{ default: JSONValue }>("../test/*.json");
const div = document.getElementById("app")!;
const styling = {
  properties: "gray",
  number: "lightBlue",
  string: "green",
  null: "teal",
  boolean: "purple",
  braces: "orange",
  brackets: "red",
  comma: "yellow",
  semi: "hotPink",
};

Object.keys(files).forEach(async (path, i) => {
  const module = await files[path]();

  div.insertAdjacentHTML("beforeend", `<div id="c${i + 1}" class="container"></div>`);

  mount(`#c${i + 1}`, module.default, { styling });
});
