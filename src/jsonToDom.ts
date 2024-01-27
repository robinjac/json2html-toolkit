export function toJsonHtmlString(object: object, space?: number) {
  return `<pre>${JSON.stringify(object, undefined, space ?? 2)}</pre>`;
}
