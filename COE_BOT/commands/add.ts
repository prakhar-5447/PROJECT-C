import { Message } from "discord.js";
export default {
  callback: (message: Message, ...args: string[]) => {
    let sum = 0;

    for (const arg of args) {
      sum += parseInt(arg);
    }

    return message.reply(`the sum is ${sum}`);
  },
};