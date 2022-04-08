import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "delete multiple message at once",
  //   permission: ["ADMINISTRATOR"],
  //   requiredRoles:true,
  maxArgs: 1,
  expectedArgs: "[amount]",
  slash: "both",
  testOnly: true,
  callback: async ({ interaction, channel, args }) => {
    if (interaction) {
      const amount = args.length ? parseInt(args.shift()!) : 10;
      const { size } = await channel.bulkDelete(amount, true);
      const reply = await `delete ${size} message(s)`;

      interaction.reply(reply);
    }
  },
} as ICommand;
