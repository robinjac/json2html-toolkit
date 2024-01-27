import "./style.css";
import { mount } from "./jsonToDom.ts";
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

mount("#app", testJSON, { styling })
