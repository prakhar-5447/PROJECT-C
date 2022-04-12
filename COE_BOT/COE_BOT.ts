import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from "path";

dotenv.config(); //Access .env file

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  let handler = require("./command-handler");
  if (handler.default) handler = handler.default;
  handler(client);
  console.log("I'm online...⚓");
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    botOwners: ["825662766584037406"],
    typeScript: true,
    testServers: ["884416707123359785"],
    mongoUri: process.env.MONGO_URI,
  });
  const guildId = "884416707123359785";
  const guild = client.guilds.cache.get(guildId);

  let commands;
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }
});

client.login(process.env.TOKEN);