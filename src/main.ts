import "./style.css";
import { toJsonHtmlString } from "./jsonToDom.ts";
import testJSON from "../test/test.json";

document.querySelector<HTMLButtonElement>("#app")!.innerHTML =
  toJsonHtmlString(testJSON, 4);
