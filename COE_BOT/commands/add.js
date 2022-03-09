"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var sum = 0;
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            sum += parseInt(arg);
        }
        return message.reply("the sum is ".concat(sum));
    },
};
