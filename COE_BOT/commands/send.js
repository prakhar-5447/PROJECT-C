"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "configuration",
    description: "send a message ",
    slash: "both",
    testOnly: true,
    permissions: ["ADMINISTRATOR"],
    minArgs: 2,
    guildOnly: true,
    expectedArgs: "<channel> <text>",
    expectedArgsTypes: ["CHANNEL", "STRING"],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var channel = (message
            ? message.mentions.channels.first()
            : interaction.options.getChannel("channel"));
        if (!channel || channel.type !== "GUILD_TEXT") {
            return "Please tag a text channel";
        }
        args.shift();
        var text = args.join(" ");
        channel.send(text);
        if (interaction) {
            interaction.reply({ content: "send message", ephemeral: true });
        }
    },
};
