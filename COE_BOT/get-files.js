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
var fs_1 = __importDefault(require("fs"));
var getFiles = function (dir, suffix) {
    var files = fs_1.default.readdirSync(dir, { withFileTypes: true });
    var commandFiles = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (file.isDirectory()) {
            commandFiles = __spreadArray(__spreadArray([], commandFiles, true), getFiles("".concat(dir, "/").concat(file.name), suffix), true);
        }
        else if (file.name.endsWith(suffix)) {
            commandFiles.push("".concat(dir, "/").concat(file.name));
        }
    }
    return commandFiles;
};
exports.default = getFiles;
