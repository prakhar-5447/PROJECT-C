import { Client } from "discord.js";
import punishmentSchema from "../models/punishment-schema";

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    const result = await punishmentSchema.findOne({
      guildId: member.guild.id,
      userId: member.id,
      type: "mute",
    });

    if (result) {
      const muteRole = member.guild.roles.cache.find(
        (role) => role.name === "Muted"
      );
      if (muteRole) member.roles.add(muteRole);
    }

    const check = async () => {
      const query = { expire: { $lt: new Date() } };
      const results = await punishmentSchema.find(query);

      for (const result of results) {
        const { guildId, userId, type } = result;
        const guild = await client.guilds.fetch(guildId);

        if (!guild) {
          console.log(`guild ${guildId} no longer uses this bot`);
          continue;
        }

        if (type === "ban") {
          guildId.members.unban(userId, "ban expires");
        } else if (type === "mute") {
          const muteRole = guild.roles.cache.find(
            (role) => role.name === "Muted"
          );

          if (!muteRole) {
            console.log(`guild ${guildId} has no muted role`);
            continue;
          }

          const member = guildId.members.cache.get(userId);

          if (!member) continue;
          member.roles.remove(muteRole);
        }
      }
      await punishmentSchema.deleteMany(query);
      setTimeout(check, 1000 * 60);
    };
    check();
  });
};

export const config = {
  dbname: "EXPIRED_PUNISHMENTS",
  displayNmae: "Expired Punishment",
};
