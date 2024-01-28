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
  semi?: string;
  comma?: string;
};

export type Config = {
  space?: number;
  styling?: Styling;
};

const pre = (text: string, styling?: Styling) => {
  if (!styling)
    return `<pre style="position: relative; white-space: pre-wrap; margin:0">${text}</pre>`;

  const css = Object.entries(styling)
    .map(([field, color]) => `--json-to-dom-${field}:${color};`)
    .join("");

  return `<pre style="position: relative; white-space: pre-wrap; margin:0; ${css}">${text}</pre>`;
};

const span =
  (variable: string, record?: Record<string, string>) => (value: string) =>
    `<span style="color: var(${variable})">${
      record ? record[value] : value
    }</span>`;

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

const fields: { [key: string]: string } = {};
const strings: { [key: string]: string } = {};

const markFields = (value: string, pos: number) => {
  const key = `_field${pos}_`;

  fields[key] = value;
  return key;
};

const markStringArrays = (value: string, _: string, __: number, pos: number) =>
  value.replace(
    /"((?:[^\\"]|\\.)*)"/g,
    (match: string, ___: string, pos2: number) => {
      const key = `_string${pos}${pos2}_`;

      strings[key] = match;
      return key;
    }
  );

const markStringFields = (
  _: string,
  field: string,
  stringValue: string,
  pos: number
) => {
  const fieldKey = `_field${pos}_`;
  const stringKey = `_string${pos}_`;

  fields[fieldKey] = `"${field}"`;
  strings[stringKey] = stringValue;

  return `${fieldKey}: ${stringKey}`;
};

export const toJsonHtmlString = (json: JSONValue, config: Config = {}) => {
  // Be careful with the ordering here, can mess upp the regex replacement
  const withSpans = toString(json, config.space)
    .replace(/"([^"]+)":\s*("[^"\\]*(?:\\.[^"\\]*)*")/g, markStringFields)
    .replace(/\[\s*("[^"]*")\s*(?:,\s*("[^"]*")\s*)*\]/g, markStringArrays)
    .replace(/"(?:\\.|[^"\\])*"/g, markFields)
    .replace(/:/g, span("--json-to-dom-semi"))
    .replace(/,/g, span("--json-to-dom-comma"))
    .replace(/[\[\]]/g, span("--json-to-dom-brackets"))
    .replace(/[\{\}]/g, span("--json-to-dom-braces"))
    .replace(/\b(?:true|false)\b/g, span("--json-to-dom-boolean"))
    .replace(/-?\b\d+(\.\d+)?\b/g, span("--json-to-dom-number"))
    .replace(/\bnull\b/g, span("--json-to-dom-null"))
    .replace(/(_field\d+_)/g, span("--json-to-dom-field", fields))
    .replace(/(_string\d+_)/g, span("--json-to-dom-string", strings));

  return pre(withSpans, config.styling);
};

export const mount = (
  selector: string,
  json: JSONValue,
  config: Config = {}
) => {
  document.querySelector<HTMLButtonElement>(selector)!.innerHTML =
    toJsonHtmlString(json, config);
};
