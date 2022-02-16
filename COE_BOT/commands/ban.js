"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "moderation",
    description: "ban a user ",
    slash: "both",
    testOnly: true,
    // permissions:['ADMINISTRATOR'],
    requireRoles: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: "<user> <reason>",
    expectedArgsTypes: ["USER", "STRING"],
    callback: function (_a) {
        var _b;
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var target = message
            ? (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()
            : interaction.options.getMember("user");
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
            content: "You banned <@" + target.id + ">",
            ephemeral: true,
        };
    },
};
