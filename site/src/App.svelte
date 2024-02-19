<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";

  const json = {
    "Json to": "Html Tookkit  🥳",
    version: "0.0.3",
    description:
      "Tiny library/tool to print out or insert a json object into the dom 🤘",
    features: {
      tiny: "9.11kb unpacked size",
      no: "dependencies 😎",
      stylable: {
        properties: "#df3079",
        number: "#df3079",
        string: "#00a67d",
        null: "#2e95d3",
        boolean: "#2e95d3",
        braces: "#d9d9e3",
        brackets: "#d9d9e3",
        comma: "#d9d9e3",
        semi: "#d9d9e3",
      },
    },
    isAwesome: true,
  };
</script>

<div>
  {@html toHtmlString(json, { space: 4 })}
</div>

<style>
  div {
    background-color: black;
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
