import type { Config, Styling, JSONValue } from "./index.d";

const pre = (text: string, prefix: string, styling?: Styling) => {
  const element = (text: string, css = "") =>
    `<pre style="position: relative; white-space: pre-wrap; margin:0; ${css}">${text}</pre>`;

  if (!styling) return element(text);

  const css = Object.entries(styling)
    .map(([styleKey, color]) => `--${prefix}-${styleKey}:${color};`)
    .join("");

  return element(text, css);
};

const span =
  (variable: string, record?: Record<string, string>) => (value: string) =>
    `<span style="color: var(${variable})">${
      record ? record[value] : value
    }</span>`;

const toString = (json: JSONValue, space?: number) =>
  JSON.stringify(json, undefined, space ?? 2);

const properties: { [key: string]: string } = {};
const strings: { [key: string]: string } = {};

const preProcessProperties = (value: string, pos: number) => {
  const key = `_property${pos}_`;

  properties[key] = value;
  return key;
};

const preProcessStringInArrays = (
  value: string,
  _: string,
  __: number,
  pos: number
) =>
  value.replace(
    /"((?:[^\\"]|\\.)*)"/g,
    (match: string, ___: string, pos2: number) => {
      // Not sure if this could collide with any other id (no uniqueness quarantee)
      const key = `_string${pos}${pos2}_`;

      strings[key] = match;
      return key;
    }
  );

const preProcessStringAndProperties = (
  _: string,
  property: string,
  stringValue: string,
  pos: number
) => {
  const propertyKey = `_property${pos}_`;
  const stringKey = `_string${pos}_`;

  properties[propertyKey] = `"${property}"`;
  strings[stringKey] = stringValue;

  return `${propertyKey}: ${stringKey}`;
};

export const toHtmlString = (json: JSONValue, config: Config = {}) => {
  const prefix = config.prefixCssVariables ?? "json2html";
  // Be careful with the ordering here, can mess upp the regex replacement
  const withSpans = toString(json, config.space)
    // Strings need delicate handling, so we need to pre-process them before replacing everything else
    .replace(
      /"([^"]+)":\s*("[^"\\]*(?:\\.[^"\\]*)*")/g,
      preProcessStringAndProperties
    )
    .replace(
      /\[\s*("[^"]*")\s*(?:,\s*("[^"]*")\s*)*\]/g,
      preProcessStringInArrays
    )
    .replace(/"(?:\\.|[^"\\])*"/g, preProcessProperties)
    .replace(/:/g, span(`--${prefix}-semi`))
    .replace(/,/g, span(`--${prefix}-comma`))
    .replace(/[\[\]]/g, span(`--${prefix}-brackets`))
    .replace(/[\{\}]/g, span(`--${prefix}-braces`))
    .replace(/\b(?:true|false)\b/g, span(`--${prefix}-boolean`))
    .replace(/-?\b\d+(\.\d+)?\b/g, span(`--${prefix}-number`))
    .replace(/\bnull\b/g, span(`--${prefix}-null`))
    .replace(/(_property\d+_)/g, span(`--${prefix}-properties`, properties))
    .replace(/(_string\d+_)/g, span(`--${prefix}-string`, strings));

  return pre(withSpans, prefix, config.styling);
};

export const insertAt = (
  selector: string,
  json: JSONValue,
  config: Config = {}
) => {
  document.querySelector<HTMLButtonElement>(selector)!.innerHTML =
    toHtmlString(json, config);
};

export type { Config, Styling, JSONValue } from "./index.d";
