<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { randomHue, complementaryHue } from "./utils";
  import CopyIcon from "./CopyIcon.svelte";

  const json = {
    name: "Json to Html Toolkit 🥳",
    description: "Insert a json object into the dom 🤘",
    features: {
      tiny: "9.11kb unpacked size",
      dependencies: "none",
      stylable: "Just the way you like it! 😎",
    },
  };

  const baseHue = randomHue();
  const fgHues = [baseHue, baseHue + 90];
  const bgBaseHue = complementaryHue(baseHue + 45);

  let hues = tweened(
    [...fgHues, bgBaseHue, bgBaseHue - 45, complementaryHue(bgBaseHue - 45)],
    {
      duration: 1000,
    }
  );

  $: colors = $hues.map(
    (hue, i) => `hsl(${Math.round(hue)},${i > 1 ? 50 : 100}%, 50%)`
  );

  onMount(() => {
    setInterval(() => {
      $hues = $hues.map((hue) => hue + 20);
    }, 1000);
  });
</script>

<div
  class="banner"
  style={`--gradient-from: ${colors[2]}; --gradient-to: ${colors[3]}; --border-color: ${colors[4]}`}
>
  <div
    class="json-box"
    style={`--color1: ${colors[0]}; --color2: ${colors[1]}`}
  >
    {@html toHtmlString(json, { space: 4 })}
  </div>

  <div class="section-group">
    <code class="copy-box">
      <span>$ npm install json2html-toolkit</span>
      <CopyIcon />
    </code>
    <button>Get started</button>
  </div>
</div>

<style>
  :root {
    --card-background-color: rgb(39 39 42);
  }

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0 14rem;
    white-space: nowrap;
    font-size: 16rem;
    border-radius: 12px;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    height: 44rem;
  }

  .copy-box {
    display: grid;
    grid-template-columns: 1fr 20rem;
    gap: 0 10rem;
    height: 48rem;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: var(--card-background-color);
    padding: 0 14rem;
    border-radius: 12px;
    font-size: 14rem;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .section-group {
    padding: 20rem 0;
    display: grid;
    gap: 10rem;
  }

  .json-box {
    display: inline-flex;
    height: fit-content;
    padding: 14rem;
    font-size: 16rem;
    background-color: var(--card-background-color);
    border-radius: 16px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

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

  .banner {
    display: flex;
    flex-direction: column;
    height: calc(100% - 10px);
    align-items: center;
    padding-top: 180rem;
    background: linear-gradient(
      200deg,
      var(--gradient-from),
      var(--gradient-to)
    );
    border-bottom: 10px solid;
    border-color: var(--border-color);
  }
</style>
