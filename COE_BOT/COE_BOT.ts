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
  console.log("Bot is ready");
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    botOwners:['825662766584037406'],
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

// commands?.create({ name: "ping", description: "reply with pong" });

//   commands?.create({
//     name: "add",
//     description: "AddTwoNumber",
//     options: [
//       {
//         name: "num1",
//         description: "the first no.",
//         required: true,
//         type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//       },
//       {
//         name: "num2",
//         description: "the second no.",
//         required: true,
//         type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//       },
//     ],
//   });
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) {
//     return;
//   }

//   const { commandName, options } = interaction;

//   if (commandName == "ping") {
//     interaction.reply({ content: "pong", ephemeral: true });
//   } else if (commandName == "add") {
//     const num1 = options.getNumber("num1") || 0;
//     const num2 = options.getNumber("num2") || 0;
//     await interaction.deferReply({ ephemeral: true });
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     await interaction.editReply({
//       content: `the sum is ${num1 + num2}`,
//     });
//   }
