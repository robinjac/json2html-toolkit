import "./style.css";
import { toJsonHtmlString } from "./jsonToDom.ts";
import testJSON from "../test/test.json";

const json = toJsonHtmlString(testJSON, 4);

document.querySelector<HTMLButtonElement>("#app")!.innerHTML = json;
