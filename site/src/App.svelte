<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";
  import Typewriter from "svelte-typewriter";

  const json = {
    name: "Json to Html Toolkit  🥳",
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
  <div>
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
    background: linear-gradient(135deg, #FFFF00, #000080);
  }

  /* Styling like chat gpt json print 🤘 */
  :root {
    --json2html-properties: #df3079;
    --json2html-number: #df3079;
    --json2html-string: #00a67d;
    --json2html-null: #2e95d3;
    --json2html-boolean: #2e95d3;
    --json2html-braces: #d9d9e3;
    --json2html-brackets: #d9d9e3;
    --json2html-comma: #d9d9e3;
    --json2html-semi: #d9d9e3;
  }
</style>
