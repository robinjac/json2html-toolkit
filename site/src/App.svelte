<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";
  import Typewriter from "svelte-typewriter";
  import { getContrastColors, type HexColor } from "./utils";

  const colorset: HexColor[] = ["#df3079", "#00a67d", "#2e95d3", "#d9d9e3"];

  const contrastColors = Object.values(getContrastColors(colorset));

  const lastIndex = contrastColors.length - 1;

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
</script>

<Typewriter mode="cascade" interval={60}>
  <div
    style={`--gradient-from: ${contrastColors[0].lightColor}; --gradient-to: ${
      contrastColors[lastIndex].darkColor
    }`}
  >
    {@html toHtmlString(json, { space: 4 })}
  </div>
</Typewriter>

<style>
  div {
    display: flex;
    padding: 10%;
    justify-content: start;
    align-items: start;
    height: 15vh;
    background: linear-gradient(
      200deg,
      var(--gradient-from),
      var(--gradient-to)
    );
  }

  /* Styling like chat gpt json print 🤘 */
  :root {
    /* Color pallete */
    --color1: #df3079;
    --color2: #00a67d;
    --color3: #2e95d3;
    --color4: #d9d9e3;

    --json2html-properties: var(--color1);
    --json2html-number: var(--color1);
    --json2html-string: var(--color2);
    --json2html-null: var(--color3);
    --json2html-boolean: var(--color3);
    --json2html-braces: var(--color4);
    --json2html-brackets: var(--color4);
    --json2html-comma: var(--color4);
    --json2html-semi: var(--color4);
  }
</style>
