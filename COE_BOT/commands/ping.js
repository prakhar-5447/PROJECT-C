"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "testing",
    description: "reply with pong",
    slash: 'both',
    testOnly: true,
    callback: function (_a) {
        return 'pong';
    },
};
