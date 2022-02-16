import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "configuration",
  description: "send a message ",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  minArgs: 2,
  guildOnly:true,
  expectedArgs: "<channel> <text>",
  expectedArgsTypes: ["CHANNEL", "STRING"],
  callback: ({ message, interaction, args }) => {
    const channel = (
      message
        ? message.mentions.channels.first()
        : interaction.options.getChannel("channel")
    ) as TextChannel;

    if (!channel || channel.type !== "GUILD_TEXT") {
      return "Please tag a text channel";
    }

    args.shift();
    const text = args.join(" ");
    channel.send(text);

    if (interaction) {
      interaction.reply({ content: "send message", ephemeral: true });
    }
    
  },
} as ICommand;
