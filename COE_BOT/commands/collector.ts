import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "testing",
  description: "testing ",
  slash: "both",
  testOnly: true,
  callback: ({ message, channel }) => {
    // message.reply("enter your username : ");

    // const filter = (m: Message) => {
    //   return m.author.id === message.author.id;
    // };
    // const collector = channel.createMessageCollector({
    //   filter,
    //   max: 1,
    //   time: 1000 * 10,
    // });
    // collector.on("collect", (message) => {
    //   console.log(message.content);
    // });

    // collector.on("end", async (collected) => {
    //   if (collected.size === 0) {
    //     message.reply("you did not provide username");
    //     return;
    //   }
    //   let text = "\ncollected :\n:";
    //   collected.forEach((message) => {
    //     text += `${message.content}\n`;
    //   });
    //   message.reply(text);
    // });
  
    message.reply("Please react");
    message.react("👍");

    const filter = (reaction:MessageReaction,user:User) => {
      return user.id === message.author.id;
    };

    const collector = message.createReactionCollector({
      filter,
      max: 1,
      time: 1000 * 10,
    });
    collector.on("collect", (reaction) => {
      console.log(reaction.emoji);
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) {
        message.reply("you did not react");
        return;
      }
      let text = "\ncollected :\n:";
      collected.forEach((message) => {
        text += `${message.emoji.name}\n`;
      });
      message.reply(text);
    });

},
} as ICommand;