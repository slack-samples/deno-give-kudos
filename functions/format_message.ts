import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept inputs,
 * perform calculations, and provide outputs. Functions can be used as steps in
 * a workflow or independently.
 * Learn more: https://api.slack.com/automation/functions/custom
 */
export const FormatMessageFunction = DefineFunction({
  callback_id: "format_message",
  title: "Format the kudo message",
  description: "",
  source_file: "functions/format_message.ts", // The file with the exported function handler
  input_parameters: {
    properties: {
      doer_of_good_deeds: {
        type: Schema.slack.types.user_id,
        description: "The one receiving good remarks",
      },
      kudo_message: {
        type: Schema.types.string,
        description: "The message with good remarks",
      },
      gif_title_url: {
        type: Schema.types.string,
        description: "The energy for the GIF to match",
      },
    },
    required: ["doer_of_good_deeds", "kudo_message", "gif_title_url"],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "A kudo in message format",
      },
    },
    required: ["message"],
  },
});

/**
 * The default export for a custom function accepts a function definition
 * and a function handler that contains the custom logic for the function.
 */
export default SlackFunction(FormatMessageFunction, ({ inputs }) => {
  const { doer_of_good_deeds, kudo_message, gif_title_url } = inputs;
  const url = gif_title_url.split(" ").reverse()[0].split("?")[0];
  const quote = kudo_message.split("\n").map((line) => `> ${line}`);
  const message =
    `*Hey <@${doer_of_good_deeds}>!* Someone wanted to share some kind words with you :otter:\n` +
    `${quote.join("\n")}\n` +
    `<${url}>`;
  return {
    outputs: { message },
  };
});
