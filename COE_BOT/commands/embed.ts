import { channel } from "diagnostics_channel";
import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "send an embed",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, text,channel }) => {
    // const json = JSON.parse(text);
    // const embed = new MessageEmbed(json);
    // return embed;
    // const date= message.createdAt
    var date = new Date(),
    newDate =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
      " " +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("PRAKHAR SAHU's SOCIALS")
      .setURL("https://discord.js.org/")  //link in title
      .setAuthor(
        "Welcome to COE BOT OFFICIAL's SERVER",
        "https://cdn.discordapp.com/attachments/950812051993935914/953923810665562112/1.png", //bot logo
        "https://discord.gg/fUPHBBpT6e" //bot link
      )
      .setDescription(
        "<:favicon:885127725646491669> Thankyou for joining  {member.mention}  you are {guild.member_count}th member in server check {test.mention} channel"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/884416707123359788/885536600258404372/ajax-loader_1.gif"
      )
      .addFields([
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true },
      ])
      .addField("Inline field title", "Some value here", true)
      .setImage(
        "https://media.discordapp.net/attachments/722437402685341766/801262293693890580/banner.gif"
      )
    // .setTimestamp()
    .setFooter(
      "member.avatar_url" + " "+''+ newDate,
      "https://i.imgur.com/AfFp7pu.png"
      );
    channel.send({ embeds: [embed] });
  },
} as ICommand;
