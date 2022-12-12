import { Manifest } from "deno-slack-sdk/mod.ts";
import { FindGIFFunction } from "./functions/find_gif.ts";
import { ShareKudos } from "./workflows/share_kudos.ts";

export default Manifest({
  name: "Kudo",
  description: "Brighten someone's day with a heartfelt thank you",
  icon: "assets/icon.png",
  functions: [FindGIFFunction],
  workflows: [ShareKudos],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
