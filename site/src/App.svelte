<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";
  import Typewriter from "svelte-typewriter";
  import {
    randomHue,
    complementaryHue,
    averageHue,
  } from "./utils";

  const json = {
    name: "Json to Html Toolkit 🥳",
    description:
      "Tiny library/tool to print out or insert a json object into the dom 🤘",
    features: {
      tiny: "9.11kb unpacked size",
      dependencies: "none",
      stylable: "Just the way you like it! 😎",
    },
  };

  // Generate a random base hue
  let baseHue = randomHue();

  const sections = 3;

  // Calculate hues for the palette
  let hues: number[] = []; // Include the complementary hue
  for (let i = 0; i < sections; i++) {
    hues.push(baseHue + (80 - Math.random() * 80));
  }

  const avgHue = averageHue(hues);
  const hue_ = complementaryHue(avgHue);

  // Convert hues to RGB
  let colors = [...hues, hue_, hue_ + 30].map(
    (hue, i) => `hsl(${hue}, ${i > sections - 1 ? 50 : 100}%, 50%)`
  );
</script>

<Typewriter mode="cascade" interval={60}>
  <div
    style={`--color1: ${colors[0]}; --color2: ${colors[1]}; --color3: ${colors[2]};  --gradient-from: ${colors[3]}; --gradient-to: ${colors[4]}`}
  >
    {@html toHtmlString(json, { space: 4 })}
  </div>
</Typewriter>

<style>
  div {
    display: flex;
    padding: 140rem;
    justify-content: start;
    align-items: start;
    height: 15vh;
    font-size: 16rem;
    background: linear-gradient(
      200deg,
      var(--gradient-from),
      var(--gradient-to)
    );
    --json2html-properties: var(--color1);
    --json2html-number: var(--color1);
    --json2html-string: var(--color2);
    --json2html-null: var(--color2);
    --json2html-boolean: var(--color3);
    --json2html-braces: var(--color3);
    --json2html-brackets: var(--color3);
    --json2html-comma: var(--color3);
    --json2html-semi: var(--color3);
  }
</style>
