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
  field?: string;
  number?: string;
  string?: string;
  null?: string;
  boolean?: string;
  braces?: string;
  brackets?: string;
};

const styling = {
  field: "gray",
  number: "blue",
  string: "green",
  // null: "teal",
  boolean: "purple",
  braces: "orange",
  brackets: "red",
};

const pre = (styling: Styling, text: string) => {
  const entries = Object.entries(styling);



  const css = entries
    .map(([field, color]) => `--json-to-dom-${field}:${color};`)
    .join("");

  console.log(css);

  return `<pre style="${css}">${text}</pre>`;
};

const span = (variable: string) => (value: string) =>
  `<span style="color: var(${variable})">${value}</span>`;

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

export const toJsonHtmlString = (json: JSONValue, space?: number) => {
  return pre(styling, toString(json, space))
    .replace(/\{/g, span("--json-to-dom-braces"))
    .replace(/\}/g, span("--json-to-dom-braces"))
    .replace(/\[/g, span("--json-to-dom-brackets"))
    .replace(/\]/g, span("--json-to-dom-brackets"))
    .replace(/\b\d+(\.\d+)?\b(?![^-]*-)/g, span("--json-to-dom-number"))
    .replace(/\b(?:true|false)\b/g, span("--json-to-dom-boolean"))
    // .replace(/'[^']*'|"[^"]*"/g, span("--json-to-dom-string"))
    .replace(/\bnull\b/g, span("--json-to-dom-null"))
    .replace(/"([^"]*)"\s*:/g, span("--json-to-dom-field"));
};
