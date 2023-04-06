import { Trigger } from "deno-slack-sdk/types.ts";

const trigger: Trigger = {
  type: "shortcut",
  name: "Give some kudos",
  description: "Broadcast your appreciation with kind words and a GIF",
  workflow: "#/workflows/give_kudos_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default trigger;
