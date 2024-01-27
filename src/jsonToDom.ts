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
    .map(([field, color]) => `--Json-To-Dom-${field}:${color};`)
    .join("");

  return `<pre style="position: relative; margin:0; ${css}">${text}</pre>`;
};

const span = (variable: string) => (value: string) =>
  `<span style="positon: relative; color: var(${variable})">${value}</span>`;

const spanNumber =
  (variable: string) => (value: string, p1: string | undefined) => {
    if (p1 !== undefined)
      return `<span style="positon: relative; color: var(${variable})">${value}</span>`;

    // If it's within quotes, keep it unchanged
    return value;
  };

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

export const toJsonHtmlString = (json: JSONValue, space?: number) => {
  const withSpans = toString(json, space)
    .replace(/"([^"]*)"/g, span("--Json-To-Dom-String"))
    .replace(/[\{\}]/g, span("--Json-To-Dom-Braces"))
    .replace(/[\[\]]/g, span("--Json-To-Dom-Brackets"))
    .replace(
      /(-?\b0*[1-9]\d*(\.\d+)?\b)|("[^"]*")/g,
      spanNumber("--Json-To-Dom-Number")
    )
    .replace(/\b(?:true|false)\b/g, span("--Json-To-Dom-Boolean"))
    .replace(/\bnull\b/g, span("--Json-To-Dom-Null"))
    //.replace(/"([^"]*)"\s*:/g, span("--Json-To-Dom-Field"));
  return pre(styling, withSpans);
};
