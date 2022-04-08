import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "kick a user ",
  slash: "both",
  testOnly: true,
  // permissions:['ADMINISTRATOR'],
  requireRoles: true,
  guildOnly: true,
  minArgs: 2,
  expectedArgs: "<user> <reason>",
  expectedArgsTypes: ["USER", "STRING"],
  callback: ({ interaction, args }) => {
    const target = interaction.options.getMember("user") as GuildMember;
    if (!interaction) {
      return;
    }
    
    if (!target) {
      return {
        custom: true,
        content: "Please tag anyone to kick",
        ephemeral: true,
      };
    }
    if (!target.kickable) {
      return "cannot kick that user";
    }
    args.shift();
    const reason = args.join(" ");

    target.kick(reason);
    return {
      custom: true,
      content: `You kicked <@${target.id}>`,
      ephemeral: true,
    };
  },
} as ICommand;
