// Function to generate a random hue value between 0 and 360
export function randomHue() {
  return Math.round(Math.random() * 360);
}

// Function to generate a complementary hue
export function complementaryHue(hue: number) {
  return hue + 180;
}
