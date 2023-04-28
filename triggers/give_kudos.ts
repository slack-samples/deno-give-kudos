import { Trigger } from "deno-slack-sdk/types.ts";
import { GiveKudosWorkflow } from "../workflows/give_kudos.ts";

const trigger: Trigger<typeof GiveKudosWorkflow.definition> = {
  type: "shortcut",
  name: "Give some kudos",
  description: "Broadcast your appreciation with kind words and a GIF",
  workflow: `#/workflows/${GiveKudosWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default trigger;
