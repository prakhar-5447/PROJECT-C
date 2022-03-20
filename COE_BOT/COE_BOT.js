"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config(); //Access .env file
var client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.on("ready", function () {
    var _a;
    var handler = require("./command-handler");
    if (handler.default)
        handler = handler.default;
    handler(client);
    console.log("I'm online...⚓");
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, "commands", "economy"),
        featuresDir: path_1.default.join(__dirname, "features"),
        botOwners: ["825662766584037406"],
        typeScript: true,
        testServers: ["884416707123359785"],
        mongoUri: process.env.MONGO_URI,
    });
    var guildId = "884416707123359785";
    var guild = client.guilds.cache.get(guildId);
    var commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
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
