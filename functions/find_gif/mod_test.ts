import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import FindGIF from "./mod.ts";

const { createContext } = SlackFunctionTester("find_gif");

Deno.test("Find a GIF with the appreciation tag", async () => {
  const inputs = { vibe: "Appreciation for someone 🫂" };
  const expectedGIFs = [
    "https://media2.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif",
    "https://media2.giphy.com/media/3ohs7NuHL3gjbe2uGI/giphy-downsized.gif",
    "https://media1.giphy.com/media/NEvPzZ8bd1V4Y/giphy-downsized.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});

Deno.test("Ensure otter gifs are returned if no vibe is selected", async () => {
  const inputs = { vibe: "" };
  const expectedGIFs = [
    "https://media1.giphy.com/media/MbAlP79yMRysHKUyHV/giphy-downsized.gif",
    "https://media0.giphy.com/media/tQAApm4PMOpiM/giphy.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});
