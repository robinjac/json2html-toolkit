interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export type Styling = {
  Field?: string;
  Number?: string;
  String?: string;
  Null?: string;
  Boolean?: string;
  Braces?: string;
  Brackets?: string;
};

const styling = {
  Field: "gray",
  Number: "lightBlue",
  String: "green",
  Null: "teal",
  Boolean: "purple",
  Braces: "orange",
  Brackets: "red",
};

const pre = (styling: Styling, text: string) => {
  const css = Object.entries(styling)
    .map(([field, color]) => `--json-to-dom-${field}:${color};`)
    .join("");

  return `<pre style="position: relative; margin:0; ${css}">${text}</pre>`;
};

const span = (variable: string) => (value: string) =>
  `<span style="positon: relative; color: var(${variable})">${value}</span>`;

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

export const toJsonHtmlString = (json: JSONValue, space?: number) => {
  const withSpans = toString(json, space)
    .replace(/\{/g, span("--json-to-dom-Braces"))
    .replace(/\}/g, span("--json-to-dom-Braces"))
    .replace(/\[/g, span("--json-to-dom-Brackets"))
    .replace(/\]/g, span("--json-to-dom-Brackets"))
    .replace(
      /(?<![\w"])(-?\b0*[1-9]\d*(\.\d+)?\b)(?![\w"])/g,
      span("--json-to-dom-Number")
    )
    .replace(/\b(?:true|false)\b/g, span("--json-to-dom-Boolean"))
    // .replace(/'[^']*'|"[^"]*"/g, span("--json-to-dom-String"))
    .replace(/\bnull\b/g, span("--json-to-dom-Null"))
    .replace(/"([^"]*)"\s*:/g, span("--json-to-dom-Field"));
  return pre(styling, withSpans);
};
