import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "send",
  slash: true,
  testOnly: true,
  callback: async ({ interaction: msgInt, channel }) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("ban_yes")
          .setEmoji("🔨")
          .setLabel("confirm")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("ban_no")
          .setLabel("cancel")
          .setStyle("DANGER")
      );

    const linkRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL("https://google.com")
        .setLabel("visit")
        .setStyle("LINK")
    );

    await msgInt.reply({
      content: "Are YOU SURE ?",
      components: [row, linkRow],
      ephemeral: true,
    });

    const filter = (btnInt: ButtonInteraction) => {
      return msgInt.user.id === btnInt.user.id;
    };

    const collector = channel.createMessageComponentCollector({
      // filter,
      max: 1,
      time: 1000 * 15,
    });

    collector.on("collect", (i: ButtonInteraction) => {
      i.reply({
        content: "you click a button",
        ephemeral: true,
      });
    });

    collector.on("end", async (collection) => {
      collection.forEach((click) => {
        console.log(click.user.id, click.customId);
      });
      if (collection.first()?.customId === "ban_yes") {
        //ban the target user
      }
      await msgInt.editReply({
        content: "An action been already taken",
        components: [],
      });
    });
  },
} as ICommand;
