"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "game",
    description: "check balance",
    testOnly: true,
    // permissions:['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,
    maxArgs: 1,
    expectedArgs: "<user>",
    expectedArgsTypes: ["USER"],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        var user;
        if (message)
            return;
        if (interaction)
            user = interaction.options.getMember("user");
        if (interaction)
            return interaction.reply("ID: " + user);
    },
};
