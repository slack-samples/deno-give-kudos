import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals, assertStringIncludes } from "testing/asserts.ts";
import FormatMessage from "./format_message.ts";

/**
 * The actual outputs of a function can be compared to expected outputs for a
 * collection of given inputs.
 * Learn more: https://api.slack.com/automation/functions/custom#testing
 */
const { createContext } = SlackFunctionTester("format_message");

Deno.test("Mention the kind kudo receiver", async () => {
  const inputs = {
    doer_of_good_deeds: "USLACKBOT",
    kudo_message: ["thank you for the reminders", "what a good bot"].join("\n"),
    gif_title_url:
      "testing tests test testing https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHFhZW5hb2Y5ODA2MnU0YjBvd2llY3I4ejI4N3A4aTdmMHV1dGdqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3orieKKmYyvUdR3RkY/giphy.gif?cid=example",
  };

  const { outputs, error } = await FormatMessage(createContext({ inputs }));
  assertEquals(error, undefined);
  assertStringIncludes(outputs!.message, "<@USLACKBOT>");
  assertStringIncludes(outputs!.message, "> thank you for the reminders");
  assertStringIncludes(outputs!.message, "> what a good bot");
  assertStringIncludes(
    outputs!.message,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHFhZW5hb2Y5ODA2MnU0YjBvd2llY3I4ejI4N3A4aTdmMHV1dGdqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3orieKKmYyvUdR3RkY/giphy.gif",
  );
});
