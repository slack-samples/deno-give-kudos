import { SlackFunction } from "deno-slack-sdk/mod.ts";
import FindGIF from "./definition.ts";
import gifs from "./gifs.json" assert { type: "json" };

interface GIF {
  URL: string;
  alt_text?: string;
  tags: string[];
}

const getEnergy = (vibe: string): string => {
  if (vibe === "Appreciation for someone 🫂") return "appreciation";
  if (vibe === "Celebrating a victory 🏆") return "celebration";
  if (vibe === "Thankful for great teamwork ⚽️") return "thankful";
  if (vibe === "Amazed at awesome work ☄️") return "amazed";
  if (vibe === "Excited for the future 🎉") return "excited";
  if (vibe === "No vibes, just plants 🪴") return "plants";
  return "otter"; // 🦦
};

const matchVibe = (vibe: string): GIF => {
  const energy = getEnergy(vibe);
  const matches = gifs.filter((g: GIF) => g.tags.includes(energy));
  const randomGIF = Math.floor(Math.random() * matches.length);
  return matches[randomGIF];
};

export default SlackFunction(FindGIF, ({ inputs }) => {
  const { vibe } = inputs;
  const gif = matchVibe(vibe);
  return { outputs: gif };
});
