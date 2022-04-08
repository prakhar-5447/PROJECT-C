"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "moderation",
    description: "ban a user ",
    slash: "both",
    testOnly: true,
    // permissions:['ADMINISTRATOR'],
    guildOnly: true,
    minArgs: 2,
    expectedArgs: "<user> <reason>",
    expectedArgsTypes: ["USER", "STRING"],
    callback: function (_a) {
        var interaction = _a.interaction, args = _a.args;
        if (!interaction) {
            return;
        }
        var target = interaction.options.getMember("user");
        if (!target) {
            return {
                custom: true,
                content: "Please tag anyone to ban",
                ephemeral: true,
            };
        }
        if (!target.bannable) {
            return "cannot ban that user";
        }
        args.shift();
        var reason = args.join(" ");
        target.ban({ reason: reason, days: 7 });
        return {
            custom: true,
            content: "You banned <@".concat(target.id, ">"),
            ephemeral: true,
        };
    },
};
