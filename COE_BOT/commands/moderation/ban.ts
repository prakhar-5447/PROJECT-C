import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "ban a user ",
  slash: "both",
  testOnly: true,
  // permissions:['ADMINISTRATOR'],
  guildOnly: true,
  minArgs: 2,
  expectedArgs: "<user> <reason>",
  expectedArgsTypes: ["USER", "STRING"],
  callback: ({ interaction, args }) => {
    if(!interaction){
      return;
    }

    const target = interaction.options.getMember("user") as GuildMember;

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

    target.ban({ reason, days: 7 });
    return {
      custom: true,
      content: `You banned <@${target.id}>`,
      ephemeral: true,
    };
  },
} as ICommand;
