"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_files_1 = __importDefault(require("./get-files"));
exports.default = (function (client) {
    var commands = {};
    var suffix = ".ts";
    var commandFiles = (0, get_files_1.default)("./commands", suffix);
    console.log(commandFiles);
    for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
        var command = commandFiles_1[_i];
        var commandFile = require(command);
        if (commandFile.default)
            commandFile = commandFile.default;
        var split = command.replace(/\\/g, "/").split("/");
        var commandName = split[split.length - 1].replace(suffix, "");
        commands[commandName.toLowerCase()] = commandFile;
    }
    console.log(commands);
    client.on("messageCreate", function (message) {
        var _a;
        if (message.author.bot || !message.content.startsWith("!"))
            return;
        var args = message.content.slice(1).split(/ +/);
        var commandName = args.shift().toLowerCase();
        if (!commands[commandName])
            return;
        try {
            (_a = commands[commandName]).callback.apply(_a, __spreadArray([message], args, false));
        }
        catch (error) {
            console.log(error);
        }
    });
});
