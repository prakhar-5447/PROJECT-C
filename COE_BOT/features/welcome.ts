import { Client, MessageEmbed, TextChannel } from "discord.js";
import welcomeSchema from "../models/welcome-schema";

const welcomeData = {} as {
  //guildID:[channel,message]
  [key: string]: [TextChannel, string];
};

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    const { guild, id } = member;
    let data = welcomeData[guild.id];
    if (!data) {
      const results = await welcomeSchema.findById(guild.id);
      if (!results) {
        return;
      }
      const { channelId } = results;
      const channel = client.channels.cache.get(channelId) as TextChannel;

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
              "[Instagram](https://instagram.com/pratham_0094)" +
              "```pratham_0094```",
          },
        ])
        .setTimestamp()
        .setFooter({
          text: `${member}`,
          iconURL:
            "https://cdn.discordapp.com/attachments/950812051993935914/954000849565270036/loading_3.gif",
        });

      channel.send({embeds : [embed]});
    }
    data[0].send({
      content: data[1].replace(/@/g, `<@${id}>`),
      allowedMentions: { users: [] },
    });
  });
};

export const config = {
  displayName: "welcome-channel",
  dbName: "WELCOME_CHANNEL",
};
