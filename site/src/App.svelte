<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { randomHue, complementaryHue } from "./utils";

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

  const baseHue = randomHue();
  const fgHues = [baseHue, baseHue + 90];
  const bgBaseHue = complementaryHue(baseHue + 45);

  // Generate a random base hue
  let hues = tweened(
    [...fgHues, bgBaseHue, bgBaseHue - 45, complementaryHue(bgBaseHue - 45)],
    {
      duration: 1000,
    }
  );

  $: colors = $hues.map(
    (hue, i) => `hsl(${Math.round(hue)},${i > 2 ? 50 : 100}%, 50%)`
  );

  onMount(() => {
    setInterval(() => {
      $hues = $hues.map((hue) => hue + 20);
    }, 1000);
  });
</script>

<div
  class="json-box"
  style={`--color1: ${colors[0]}; --color2: ${colors[1]};  --gradient-from: ${colors[2]}; --gradient-to: ${colors[3]}; --border-color: ${colors[4]}`}
>
  {@html toHtmlString(json, { space: 4 })}
</div>

<code class="copy-box">npm install json2html-toolkit</code>

<style>
  :root {
    --copy-background-color: rgb(39 39 42);
  }

  .copy-box {
    display: inline-flex;
    color: white;
    background-color: var(--copy-background-color);
    padding: 18rem;
    border-radius: 16px;
    font-size: 16rem;
  }

  .json-box {
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
    border-bottom: 10px solid;
    border-color: var(--border-color);
    --json2html-properties: var(--color1);
    --json2html-number: var(--color2);
    --json2html-string: var(--color2);
    --json2html-null: var(--color2);
    --json2html-boolean: var(--color2);
    --json2html-braces: var(--color1);
    --json2html-brackets: var(--color1);
    --json2html-comma: var(--color1);
    --json2html-semi: var(--color1);
  }

  /* 
  Nice colors
  style attribute {
    --color1: hsl(33.93151372274401, 100%, 50%);
    --color2: hsl(27.104123282106173, 100%, 50%);
    --color3: hsl(72.88356962304904, 100%, 50%);
    --gradient-from: hsl(224.35740833829504, 50%, 50%);
    --gradient-to: hsl(254.35740833829504, 50%, 50%);
    --border-color: hsl(74.35740833829504, 50%, 50%);
  
  */
</style>
