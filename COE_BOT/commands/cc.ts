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
  callback: async ({ message, interaction, channel, args }) => {
    const amount = args.length ? parseInt(args.shift()!) : 10;

    if (message) await message.delete();

    const { size } = await channel.bulkDelete(amount, true);
    const reply = `delete ${size} message(s)`;

    if (interaction) return reply;

    channel.send(reply);
  },
} as ICommand;
