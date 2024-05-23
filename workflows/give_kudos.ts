import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { Connectors } from "deno-slack-hub/mod.ts";
import { FormatMessageFunction } from "../functions/format_message.ts";

/**
 * A workflow is a set of steps that are executed in order. Each step in a
 * workflow is a function – either a built-in or custom function.
 * Learn more: https://api.slack.com/automation/workflows
 */
const GiveKudosWorkflow = DefineWorkflow({
  callback_id: "give_kudos_workflow",
  title: "Give kudos",
  description: "Acknowledge the impact someone had on you",
  input_parameters: {
    properties: {
      /**
       * This workflow users interactivity to collect input from the user.
       * Learn more: https://api.slack.com/automation/forms#add-interactivity
       */
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity", "channel_id"],
  },
});

/**
 * Collecting input from users can be done with the built-in OpenForm function
 * as the first step.
 * Learn more: https://api.slack.com/automation/functions#open-a-form
 */
const kudo = GiveKudosWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Give someone kudos",
    interactivity: GiveKudosWorkflow.inputs.interactivity,
    submit_label: "Share",
    description: "Continue the positive energy through your written word",
    fields: {
      elements: [
        {
          name: "doer_of_good_deeds",
          title: "Whose deeds are deemed worthy of a kudo?",
          description: "Recognizing such deeds is dazzlingly desirable of you!",
          type: Schema.slack.types.user_id,
        },
        {
          name: "kudo_channel",
          title: "Where should this message be shared?",
          type: Schema.slack.types.channel_id,
          default: GiveKudosWorkflow.inputs.channel_id,
        },
        {
          name: "kudo_message",
          title: "What would you like to say?",
          type: Schema.types.string,
          long: true,
        },
        {
          name: "kudo_vibe",
          title: 'What is this kudo\'s "vibe"?',
          description: "What sorts of energy is given off?",
          type: Schema.types.string,
          enum: [
            "Appreciation for someone 🫂",
            "Celebrating a victory 🏆",
            "Thankful for great teamwork ⚽️",
            "Amazed at awesome work ☄️",
            "Excited for the future 🎉",
            "Good vibes and plants 🪴",
          ],
        },
      ],
      required: [
        "doer_of_good_deeds",
        "kudo_channel",
        "kudo_message",
        "kudo_vibe",
      ],
    },
  },
);

/**
 * A connector function can be added as a workflow step.
 *
 * Learn more: https://api.slack.com/automation/connectors
 */
const gif = GiveKudosWorkflow.addStep(
  Connectors.Giphy.functions.GetTranslatedGif,
  // "A014JS9DWH0#/functions/get_translated_gif",
  {
    search_term: `The Office: ${kudo.outputs.fields.kudo_vibe} (lighthearted)`,
    weirdness: 8,
  },
);

/**
 * A custom function can be added as a workflow step to modify input data,
 * collect additional data for the response, and return information for use in
 * later steps.
 * Learn more: https://api.slack.com/automation/functions/custom
 */
const message = GiveKudosWorkflow.addStep(FormatMessageFunction, {
  doer_of_good_deeds: kudo.outputs.fields.doer_of_good_deeds,
  kudo_message: kudo.outputs.fields.kudo_message,
  gif_title_url: gif.outputs.gif_title_url,
});

/**
 * Messages can be sent into a channel with the built-in SendMessage function.
 * Learn more: https://api.slack.com/automation/functions#catalog
 */
GiveKudosWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: kudo.outputs.fields.kudo_channel,
  message: message.outputs.message,
});

export { GiveKudosWorkflow };
