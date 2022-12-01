import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

const FindGIF = DefineFunction({
  callback_id: "find_gif",
  title: "Find a GIF",
  description: "Search for a GIF that matches the vibe",
  source_file: "functions/find_gif/mod.ts",
  input_parameters: {
    properties: {
      vibe: {
        type: Schema.types.string,
        description: "The energy for the GIF to match",
      },
    },
    required: ["vibe"],
  },
  output_parameters: {
    properties: {
      URL: {
        type: Schema.types.string,
        description: "GIF URL",
      },
      alt_text: {
        type: Schema.types.string,
        description: "description of the GIF",
      },
    },
    required: ["URL"],
  },
});

export default FindGIF;
