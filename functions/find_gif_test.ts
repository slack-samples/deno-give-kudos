import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import FindGIF from "./find_gif.ts";

/**
 * The actual outputs of a function can be compared to expected outputs for a
 * collection of given inputs.
 */
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

Deno.test("Find a GIF with the celebration tag", async () => {
  const inputs = { vibe: "Celebrating a victory 🏆" };
  const expectedGIFs = [
    "https://media3.giphy.com/media/DhstvI3zZ598Nb1rFf/giphy-downsized.gif",
    "https://media.giphy.com/media/WKdPOVCG5LPaM/giphy.gif",
    "https://media0.giphy.com/media/kyLYXonQYYfwYDIeZl/giphy.gif",
    "https://media2.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif",
    "https://media3.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy-downsized.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});

Deno.test("Find a GIF with the thankful tag", async () => {
  const inputs = { vibe: "Thankful for great teamwork ⚽️" };
  const expectedGIFs = [
    "https://media2.giphy.com/media/3oEjHWXddcCOGZNmFO/giphy.gif",
    "https://media2.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif",
    "https://media1.giphy.com/media/NEvPzZ8bd1V4Y/giphy-downsized.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});

Deno.test("Find a GIF with the amazed tag", async () => {
  const inputs = { vibe: "Amazed at awesome work ☄️" };
  const expectedGIFs = [
    "https://media.giphy.com/media/3o6Zt2jsgmiAUl2ydi/giphy.gif",
    "https://media1.giphy.com/media/Lcn0yF1RcLANG/giphy-downsized.gif",
    "https://media0.giphy.com/media/rgIdiNjWC933y/giphy.gif",
    "https://media3.giphy.com/media/WFyvwq3xoTTMs/giphy.gif",
    "https://media3.giphy.com/media/jz2VNqCrlFsPe/giphy.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});

Deno.test("Find a GIF with the excited tag", async () => {
  const inputs = { vibe: "Excited for the future 🎉" };
  const expectedGIFs = [
    "https://media.giphy.com/media/WKdPOVCG5LPaM/giphy.gif",
    "https://media0.giphy.com/media/rgIdiNjWC933y/giphy.gif",
    "https://media2.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif",
    "https://media3.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy-downsized.gif",
  ];

  const { outputs } = await FindGIF(createContext({ inputs }));
  assertArrayIncludes(expectedGIFs, [outputs?.URL]);
});

Deno.test("Find a GIF with the plants tag", async () => {
  const inputs = { vibe: "No vibes, just plants 🪴" };
  const expectedGIFs = [
    "https://media.giphy.com/media/l3JDHv2xpLbQ7Tjdm/giphy.gif",
    "https://media3.giphy.com/media/IbsQ8L4PTQ53SH7FnL/giphy.gif",
    "https://media1.giphy.com/media/xUA7aOIFDR4ZgqLy8w/giphy.gif",
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
