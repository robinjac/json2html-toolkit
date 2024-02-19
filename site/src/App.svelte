<script lang="ts">
  import { toHtmlString } from "json2html-toolkit";

  const json = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    address: {
      street: "123 Main Street",
      city: "Anytown",
      state: "Anystate",
      zip: "12345",
    },
    isStudent: false,
    hobbies: ["reading", "running", "gardening"],
  };

  const result = toHtmlString(json, { space: 4 });
</script>

<div>
  {@html result}
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
