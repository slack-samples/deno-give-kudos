import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import FindGIF from "../functions/find_gif/definition.ts";

const ShareKudos = DefineWorkflow({
  callback_id: "share_kudos_workflow",
  title: "Share kudos",
  description: "Acknowledge the impact someone had on you",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const kudo = ShareKudos.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Write someone kudos",
    interactivity: ShareKudos.inputs.interactivity,
    submit_label: "Share",
    description: "Continue the positive energy through your written word",
    fields: {
      elements: [{
        name: "doer_of_good_deeds",
        title: "Whose deeds are deemed worthy of a kudo?",
        description: "Recognizing such deeds is dazzlingly desirable of you!",
        type: Schema.slack.types.user_id,
      }, {
        name: "kudo_channel",
        title: "Where should this message be shared?",
        type: Schema.slack.types.channel_id,
      }, {
        name: "kudo_message",
        title: "What would you like to say?",
        type: Schema.types.string,
        long: true,
      }, {
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
          "No vibes, just plants 🪴",
        ],
      }],
      required: ["doer_of_good_deeds", "kudo_channel", "kudo_message"],
    },
  },
);

const gif = ShareKudos.addStep(FindGIF, {
  vibe: kudo.outputs.fields.kudo_vibe,
});

ShareKudos.addStep(Schema.slack.functions.SendMessage, {
  channel_id: kudo.outputs.fields.kudo_channel,
  message:
    `*Hey <@${kudo.outputs.fields.doer_of_good_deeds}>!* Someone wanted to share some kind words with you :otter:\n` +
    `> ${kudo.outputs.fields.kudo_message}\n` +
    `${gif.outputs.URL}`,
});

export { ShareKudos };
