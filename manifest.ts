import { Manifest } from "deno-slack-sdk/mod.ts";
import { GiveKudosWorkflow } from "./workflows/give_kudos.ts";

/**
 * The app manifest contains the app's configuration. This file defines
 * attributes like app name, description, available workflows, and more.
 * Learn more: https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Kudo",
  description: "Brighten someone's day with a heartfelt thank you",
  icon: "assets/icon.png",
  workflows: [GiveKudosWorkflow],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
