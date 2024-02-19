export type HexColor =
  `#${string}${string}${string}${string}${string}${string}`;
export type ShortHexColor = `#${string}${string}${string}`;
export type ContrastColors = {
  [hexcolor: HexColor]: { lightColor: ShortHexColor; darkColor: ShortHexColor };
};

const MIN_CONTRAST_RATIO = 8.5;
const DARK_COLOR_LUMINANCE_FACTOR = 1.5;

const luminance = (color: HexColor) => {
  const rgb = parseInt(color.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

function adjustColor(color: HexColor, targetLuminance: number): ShortHexColor {
  const currentLuminance = luminance(color);
  const ratio = targetLuminance / currentLuminance;
  const sqrtRatio = Math.sqrt(ratio);

  let r = parseInt(color.substring(1, 3), 16) * sqrtRatio;
  let g = parseInt(color.substring(3, 5), 16) * sqrtRatio;
  let b = parseInt(color.substring(5, 7), 16) * sqrtRatio;

  // Clamp values within valid range (0 to 255)
  r = Math.min(Math.max(r, 0), 255);
  g = Math.min(Math.max(g, 0), 255);
  b = Math.min(Math.max(b, 0), 255);

  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
    .toString(16)
    .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

export function getContrastColors(colors: HexColor[]) {
  const contrastColors: ContrastColors = {};

  for (const color of colors) {
    const targetLuminance = luminance(color) * MIN_CONTRAST_RATIO;
    const lightColor = adjustColor(color, targetLuminance);
    const darkColor = adjustColor(color, targetLuminance * DARK_COLOR_LUMINANCE_FACTOR);
    contrastColors[color] = { lightColor, darkColor };
  }

  return contrastColors;
}
