import "./style.css";
import { toJsonHtmlString } from "./jsonToDom.ts";
import testJSON from "../test/test.json";

const styling = {
  field: "gray",
  number: "lightBlue",
  string: "green",
  null: "teal",
  boolean: "purple",
  braces: "orange",
  brackets: "red",
  comma: "yellow",
  semi: "hotPink",
};

document.querySelector<HTMLButtonElement>("#app")!.innerHTML = toJsonHtmlString(testJSON, {space: 4, styling});
