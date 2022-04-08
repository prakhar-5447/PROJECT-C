import { User } from "discord.js";
import punishmentSchema from "../../models/punishment-schema";
import { ICommand } from "wokcommands";

export default {
  category: "moderation",
  description: "temporary ban a user ",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  //   requireRoles: true,
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
      type: "mute",
    });

    if (result) return `<@${userId}> is already muted in the server`;

    try {
      const member = await guild.members.fetch(userId);

      if (member) {
        const muteRole = guild.roles.cache.find(
          (role) => role.name === "Muted"
        );

        if (!muteRole) return "this server does not have Muted role";
        member.roles.add(muteRole);
      }

      await new punishmentSchema({
        userId,
        guildId: guild.id,
        staffId: staff.id,
        reason,
        expires,
        type: "mute",
      }).save();
    } catch (ignore) {
      return "cannot mute that user";
    }

    return `<@${userId}> has been muted for ${duration}`;
  },
} as ICommand;
