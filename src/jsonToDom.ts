interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export type Styling = {
  field?: string;
  number?: string;
  string?: string;
  null?: string;
  boolean?: string;
  braces?: string;
  brackets?: string;
  semi?: string;
  comma?: string;
};

export type Config = {
  space?: number;
  styling?: Styling;
};

const pre = (text: string, styling?: Styling) => {
  if (!styling)
    return `<pre style="position: relative; margin:0">${text}</pre>`;

  const css = Object.entries(styling)
    .map(([field, color]) => `--json-to-dom-${field}:${color};`)
    .join("");

  return `<pre style="position: relative; margin:0; ${css}">${text}</pre>`;
};

const span = (variable: string) => (value: string) =>
  `<span style="color: var(${variable})">${value}</span>`;

const spanField = (variable: string) => (_: string, p1: string) => {
  return `<span style="color: var(${variable})">"${p1}"</span>:`;
};

const spanString = (variable: string) => (_: string, p1: string) => {
  return `: <span style="color: var(${variable})">${p1}</span>`;
};

const spanNumber =
  (variable: string) => (value: string, p1: string | undefined) => {
    if (p1 !== undefined)
      return `<span style="color: var(${variable})">${value}</span>`;

    // If it's within quotes, keep it unchanged
    return value;
  };

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

export const toJsonHtmlString = (json: JSONValue, config?: Config) => {
  // Be careful with the ordering here, can mess upp the regex
  const withSpans = toString(json, config?.space)
    .replace(/"([^"]+)":/g, spanField("--json-to-dom-field"))
    .replace(/:\s*("[^"]*")/g, spanString("--json-to-dom-string"))
    .replace(/[\{\}]/g, span("--json-to-dom-braces"))
    .replace(/[\[\]]/g, span("--json-to-dom-brackets"))
    .replace(
      /(-?\b0*[1-9]\d*(\.\d+)?\b)|("[^"]*")/g,
      spanNumber("--json-to-dom-number")
    )
    .replace(/\b(?:true|false)\b/g, span("--json-to-dom-boolean"))
    .replace(/\bnull\b/g, span("--json-to-dom-null"))
    .replace(/:\s*(?=(?:(?:[^"]*"){2})*[^"]*$)/g, span("--json-to-dom-semi"))
    .replace(/(?<!\w|")\s*,\s*(?!\w|")/g, span("--json-to-dom-comma"));
  return pre(withSpans, config?.styling);
};
