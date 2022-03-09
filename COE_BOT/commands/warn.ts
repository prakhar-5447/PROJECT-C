import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import warnSchema from "../models/warn-schema";

export default {
  category: "moderation",
  description: "warn a user ",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  // requiredRole:true,
  guildOnly: true,
  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "add a warning to user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "user to add a warning",
          required: true,
        },
        {
          name: "reason",
          type: "STRING",
          description: "reason for warning",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "remove a warning from the user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "user to remove a warning from",
          required: true,
        },
        {
          name: "id",
          type: "STRING",
          description: "id of warning to remove",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "list",
      description: "list all the warning for user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "user to list a warning for",
          required: true,
        },
      ],
    },
  ],
  callback: async ({ guild, member: staff, interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const id = interaction.options.getString("id");

    if (subCommand === "add") {
      const warnings = await warnSchema.create({
        userId: user?.id,
        staffId: staff.id,
        guildId: guild?.id,
        reason,
      });
      return {
        custom: true,
        content: `Added warning ${warnings.id} to <@${user?.id}>`,
        allowedMentions: { users: [] },
      };
    } else if (subCommand === "remove") {
      const warnings = await warnSchema.findByIdAndDelete(id);
      return {
        custom: true,
        content: `Removed warning ${warnings.id} from <@${user?.id}>`,
        allowedMentions: { users: [] },
      };
    } else if (subCommand === "list") {
      const warnings = await warnSchema.find({
        userId: user?.id,
        guildId: guild?.id,
      });

      let description = `Warning for <@${user?.id}>:\n\n`;

      for (const warn of warnings) {
        description += `**ID:** ${warn._id}\n`;
        description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
        description += `**Staff:** ${warn.staffId}\n`;
        description += `**Reason:** ${warn.reason}\n\n`;
      }

      const embed = new MessageEmbed().setDescription(description);
      return embed;
    }
  },
} as ICommand;
