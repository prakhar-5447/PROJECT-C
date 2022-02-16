import { Client } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "configuration",
  description: "set bot status",
  slash: "both",
  testOnly: true,
  ownerOnly: true,
  minArgs: 1,
  expectedArgs: "<status>",
  callback: ({ client, text }) => {
    client.user?.setPresence({
      status: "dnd",
      activities: [
        {
          name: text,
        },
      ],
    });
    return "status updated";
  },
} as ICommand;
