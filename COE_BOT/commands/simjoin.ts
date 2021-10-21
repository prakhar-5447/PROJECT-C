import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "simulate join",
  slash: "both",
  testOnly: true,
  callback: ({ member, client }) => {
    client.emit("guildMemberAdd", member);
    return "join simulated";
  },
} as ICommand;
