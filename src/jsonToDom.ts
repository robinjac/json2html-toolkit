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

export function toJsonHtmlString(json: JSONValue, space?: number) {
  return `<pre>${JSON.stringify(json, undefined, space ?? 2)}</pre>`;
}
