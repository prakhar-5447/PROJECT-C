"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "configuration",
    description: "set bot status",
    slash: "both",
    testOnly: true,
    ownerOnly: true,
    minArgs: 1,
    expectedArgs: "<status>",
    callback: function (_a) {
        var _b;
        var client = _a.client, text = _a.text;
        (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({
            status: "dnd",
            activities: [
                {
                    name: text,
                },
            ],
        });
        return "status updated";
    },
};
