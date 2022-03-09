import { User } from "discord.js";
import punishmentSchema from "../models/punishment-schema";
import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "temporary ban a user ",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  // requireRoles: true,
  minArgs: 3,
  expectedArgs: "<user> <duration> <reason>",
  expectedArgsTypes: ["USER", "STRING", "STRING"],

  callback: async ({
    message,
    interaction,
    client,
    guild,
    args,
    member: staff,
  }) => {
    if (!guild) return "you can only use it in a server";

    let userId = args.shift()!;
    const duration = args.shift()!;
    const reason = args.join(" ");
    let user: User | undefined;

    if (message) {
      user = message.mentions.users?.first();
    } else {
      user = interaction.options.getUser("user") as User;
    }

    if (!user) {
      userId = userId.replace(/[<@!>]/g, "");
      user = await client.users.fetch(userId);

      if (!user) return `could not find user with ${userId}`;
    }

    userId = user.id;
    let time;
    let type;

    try {
      const split = duration.match(/\d+|\D+/g);
      time = parseInt(split![0]);
      type = split![1].toLowerCase();
    } catch (e) {
      return 'invalid time format Example format: "10d" where d = days,h= hours and m= minutes';
    }

    if (type === "h") {
      time *= 60;
    } else if (type === "d") {
      time *= 60 * 24;
    } else if (type !== "m") {
      return "please use m, h, d for minute, hours and day respectively";
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + time);

    const result = await punishmentSchema.findOne({
      guildId: guild.id,
      userId,
      type: "ban",
    });

    if (result) return `<@${userId}> is already banned in the server`;

    try {
      await guild.members.ban(userId, { days: 7, reason });

      await new punishmentSchema({
        userId,
        guildId: guild.id,
        staffId: staff.id,
        reason,
        expires,
        type: "ban",
      }).save();
    } catch (ignore) {
      return "cannot ban that user";
    }

    return `<@${userId}> has been banned for ${duration}`;
  },
} as ICommand;
