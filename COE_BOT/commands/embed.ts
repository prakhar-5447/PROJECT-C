import { MessageEmbed} from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "send an embed",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, text }) => {
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
      .setTitle("New Member Joined to Server")
      .setURL("https://discord.js.org/")
      .setAuthor(
        "Welcome to CODERS EVOKE",
        "https://cdn.discordapp.com/attachments/884416707123359788/885532153146916874/ajax-loader.gif",
        "https://coders-evoke-community.github.io/CodersEvoke_website/"
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
    const newMessage = await message.reply({ embeds: [embed] });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const newEmbed = newMessage.embeds[0];
    newEmbed.setTitle("edited title");
    newMessage.edit({ embeds: [newEmbed] });
  },
} as ICommand;
