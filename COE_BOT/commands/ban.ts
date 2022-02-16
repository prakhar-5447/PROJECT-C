import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "ban a user ",
  slash: "both",
  testOnly: true,
  // permissions:['ADMINISTRATOR'],
  requireRoles: true,
  guildOnly: true,
  minArgs: 2,
  expectedArgs: "<user> <reason>",
  expectedArgsTypes: ["USER", "STRING"],
  callback: ({ message, interaction, args }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember("user") as GuildMember);

    if (!target) {
      return {
        custom: true,
        content: "Please tag anyone to ban",
        ephemeral: true,
      };
    }
    if (!target.bannable) {
        return "cannot ban that user";
    }
    args.shift();
    const reason = args.join(" ");
    
    target.ban({reason,days:7});
    return {
      custom: true,
      content: `You banned <@${target.id}>`,
      ephemeral: true,
    };
  },
} as ICommand;
