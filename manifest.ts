import { Manifest } from "deno-slack-sdk/mod.ts";
import FindGIF from "./functions/find_gif/definition.ts";
import { ShareKudos } from "./workflows/share_kudos.ts";

export default Manifest({
  name: "Kudo",
  description: "Brighten someone's day with a heartfelt thank you",
  icon: "assets/icon.png",
  functions: [FindGIF],
  workflows: [ShareKudos],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
