import {
  Client,
  GuildMember,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  TextChannel,
} from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "configuration",
  description: "add a role to auto role message ",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  minArgs: 3,
  maxArgs: 3,
  guildOnly: true,
  expectedArgs: "<channel> <messageId> <role>",
  expectedArgsTypes: ["CHANNEL", "STRING", "ROLE"],
  init: (client: Client) => {
    client.on("interactionCreate", (interaction) => {
      if (!interaction.isSelectMenu()) {
        return;
      }
      const { customId, values, member } = interaction;
      if (customId === "auto_roles" && member instanceof GuildMember) {
        const component = interaction.component as MessageSelectMenu;
        const removed = component.options.filter((option) => {
          return !values.includes(option.value);
        });
        for (const id of removed) {
          member.roles.remove(id.value);
        }
        for (const id of values) {
          member.roles.add(id);
        }
        interaction.reply({ content: "role updated", ephemeral: true });
      }
    });
  },
  callback: async ({ message, interaction, args, client }) => {
    const channel = (
      message
        ? message.mentions.channels.first()
        : interaction.options.getChannel("channel")
    ) as TextChannel;

    if (!channel || channel.type !== "GUILD_TEXT") {
      return "Please tag a text channel";
    }
    const messageId = args[1];
    const role = (
      message
        ? message.mentions.roles.first()
        : interaction.options.getRole("role")
    ) as Role;

    if (!role) {
      return "unknown role";
    }
    const targetMessage = await channel.messages.fetch(messageId, {
      cache: true,
      force: true,
    });

    if (!targetMessage) {
      return "unknown message id";
    }

    if (targetMessage.author.id !== client.user?.id) {
      return `please provide a message ID that was sent from <@${client.user?.id}>`;
    }

    let row = targetMessage.components[0] as MessageActionRow;

    if (!row) {
      row = new MessageActionRow();
    }

    const option: MessageSelectOptionData[] = [
      { label: role.name, value: role.id },
    ];

    let menu = row.components[0] as MessageSelectMenu;
    if (menu) {
      for (const o of menu.options) {
        if (o.value == option[0].value) {
          return {
            custom: true,
            content: `<@${o.value}> is already part of this menu`,
            allowedMentions: {
              roles: [],
            },
            ephemeral: true,
          };
        }
      }
      menu.addOptions(option);
      menu.setMaxValues(menu.options.length);
    } else {
      row.addComponents(
        new MessageSelectMenu()
          .setCustomId("auto_roles")
          .setMinValues(0)
          .setMaxValues(1)
          .setPlaceholder("select your role")
          .addOptions(option)
      );
    }
    targetMessage.edit({ components: [row] });
    return {
      custom: true,
      content: `added <@&${role.id}> to auto role menu`,
      allowedMentions: {
        roles: [],
      },
      ephemeral: true,
    };
  },
} as ICommand;
