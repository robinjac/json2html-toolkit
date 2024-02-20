// Function to generate a random hue value between 0 and 360
export function randomHue() {
  return Math.floor(Math.random() * 360);
}

// Function to generate a complementary hue
export function complementaryHue(hue: number) {
  return (hue + 180) % 360;
}

export function averageHue(hues: number[]) {
  let sumX = 0;
  let sumY = 0;
  hues.forEach((hue) => {
    sumX += Math.cos((hue * Math.PI) / 180);
    sumY += Math.sin((hue * Math.PI) / 180);
  });
  return (Math.atan2(sumY, sumX) * 180) / Math.PI;
}
