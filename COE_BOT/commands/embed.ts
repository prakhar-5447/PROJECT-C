import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "send an embed",
  slash: "both",
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  callback: async ({ text, channel, member }) => {
    // const json = JSON.parse(text);
    // const embed = new MessageEmbed(json);
    // return embed;
    // const date= message.createdAt
    var date = new Date(),
      newDate =
        [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
        " " +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
    let icon =
      "https://cdn.discordapp.com/attachments/950812051993935914/953923810665562112/1.png";
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("PRAKHAR SAHU's SOCIALS")
      .setURL("https://discord.js.org/") //coe bot website link
      .setAuthor({
        name: "Welcome to COE BOT OFFICIAL's SERVER",
        iconURL:
          "https://cdn.discordapp.com/attachments/950812051993935914/953923810665562112/1.png", //bot logo
        url: "https://discord.gg/fUPHBBpT6e", //server link
      })
      .setDescription(
        "------------丨PROJECT-C丨COE BOT丨------------\n----------丨LEARN丨BUILD丨EVOLVE丨----------"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/950812051993935914/953998540126957588/loading_2.gif"
      )
      .addFields([
        {
          name: "\u200B",
          value:
            "<:instagram:954305044612775977>" +
            "[Instagram](https://instagram.com/pratham_0094)"+"```pratham_0094```",
        },
        {
          name: "\u200B",
          value:
            "<:twitter:954009091158708305>" +
            "[Twitter](https://twitter.com/pratham_0094)"+"```pratham_0094```",
        },
        {
          name: "\u200B",
          value:
            "<:linkedin:954306145185579028>" +
            "[Linkedin](https://www.linkedin.com/in/prakhar-sahu-4519b8206)"+"```PRATHAM SAHU```",
        },
        {
          name: "\u200B",
          value:
            "<:github:954306403567292416>" +
            "[Github](https://github.com/pratham-0094)"+"```pratham-0094```",
        },
        {
          name: "\u200B",
          value: "<:discord:954246480753983488>"+"Discord"+"```PRATHAM#0094```",
        },
        {
          name: "\u200B",
          value: "<:gmail:954246385434247188>"+"Gmail"+"```sahupratham022003@gmail.com```",
        },
        {
          name: "\u200B",
          value: "\u200B",
        },
      ])
      // .setImage(
      //   "https://media.discordapp.net/attachments/722437402685341766/801262293693890580/banner.gif"
      // )
      .setTimestamp()
      .setFooter({
        text: `${member}` + "  丨  " + newDate,
        iconURL:
          "https://cdn.discordapp.com/attachments/950812051993935914/954000849565270036/loading_3.gif",
      });
    channel.send({ embeds: [embed] });
  },
} as ICommand;
