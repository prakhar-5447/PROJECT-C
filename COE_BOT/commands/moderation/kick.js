"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "moderation",
    description: "kick a user ",
    slash: "both",
    testOnly: true,
    // permissions:['ADMINISTRATOR'],
    requireRoles: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: "<user> <reason>",
    expectedArgsTypes: ["USER", "STRING"],
    callback: function (_a) {
        var interaction = _a.interaction, args = _a.args;
        var target = interaction.options.getMember("user");
        if (!interaction) {
            return;
        }
        if (!target) {
            return {
                custom: true,
                content: "Please tag anyone to kick",
                ephemeral: true,
            };
        }
        if (!target.kickable) {
            return "cannot kick that user";
        }
        args.shift();
        var reason = args.join(" ");
        target.kick(reason);
        return {
            custom: true,
            content: "You kicked <@".concat(target.id, ">"),
            ephemeral: true,
        };
    },
};
