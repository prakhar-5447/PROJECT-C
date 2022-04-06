import { ICommand } from "wokcommands";

export default {
  category: "game",
  description: "check balance",
  testOnly: true,
  // permissions:['ADMINISTRATOR'],
  slash: "both",
  guildOnly: true,
  maxArgs: 1,
  expectedArgs: "<user>",
  expectedArgsTypes: ["USER"],
  callback: ({ message, interaction }) => {
    let user;
    if (message) return;
    if (interaction) user = interaction.options.getMember("user");
    if (interaction) return interaction.reply("ID: " + user);
  },
} as ICommand;
