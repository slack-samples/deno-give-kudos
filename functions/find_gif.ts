import { SlackFunction } from "deno-slack-sdk/mod.ts";
import gifs from "../assets/gifs.json" assert { type: "json" };

import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const FindGIFFunction = DefineFunction({
  callback_id: "find_gif",
  title: "Find a GIF",
  description: "Search for a GIF that matches the vibe",
  source_file: "functions/find_gif.ts",
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

const getEnergy = (vibe: string): string => {
  if (vibe === "Appreciation for someone 🫂") return "appreciation";
  if (vibe === "Celebrating a victory 🏆") return "celebration";
  if (vibe === "Thankful for great teamwork ⚽️") return "thankful";
  if (vibe === "Amazed at awesome work ☄️") return "amazed";
  if (vibe === "Excited for the future 🎉") return "excited";
  if (vibe === "No vibes, just plants 🪴") return "plants";
  return "otter"; // 🦦
};

interface GIF {
  URL: string;
  alt_text?: string;
  tags: string[];
}

const matchVibe = (vibe: string): GIF => {
  const energy = getEnergy(vibe);
  const matches = gifs.filter((g: GIF) => g.tags.includes(energy));
  const randomGIF = Math.floor(Math.random() * matches.length);
  return matches[randomGIF];
};

export default SlackFunction(FindGIFFunction, ({ inputs }) => {
  const { vibe } = inputs;
  const gif = matchVibe(vibe);
  return { outputs: gif };
});
