"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "testing",
    description: "simulate join",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var member = _a.member, client = _a.client;
        client.emit("guildMemberAdd", member);
        return "join simulated";
    },
};
