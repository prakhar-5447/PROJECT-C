"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var warn_schema_1 = __importDefault(require("../../models/warn-schema"));
exports.default = {
    category: "moderation",
    description: "warn a user ",
    slash: "both",
    testOnly: true,
    permissions: ["ADMINISTRATOR"],
    // requiredRole:true,
    guildOnly: true,
    options: [
        {
            type: "SUB_COMMAND",
            name: "add",
            description: "add a warning to user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "user to add a warning",
                    required: true,
                },
                {
                    name: "reason",
                    type: "STRING",
                    description: "reason for warning",
                    required: true,
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "remove",
            description: "remove a warning from the user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "user to remove a warning from",
                    required: true,
                },
                {
                    name: "id",
                    type: "STRING",
                    description: "id of warning to remove",
                    required: true,
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "list",
            description: "list all the warning for user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "user to list a warning for",
                    required: true,
                },
            ],
        },
    ],
    callback: function (_a) {
        var guild = _a.guild, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var subCommand, user, reason, id, warnings, warnings, warnings, description, _i, warnings_1, warn, embed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!interaction) {
                            return [2 /*return*/];
                        }
                        subCommand = interaction.options.getSubcommand();
                        user = interaction.options.getUser("user");
                        reason = interaction.options.getString("reason");
                        id = interaction.options.getString("id");
                        if (!(subCommand === "add")) return [3 /*break*/, 2];
                        return [4 /*yield*/, warn_schema_1.default.create({
                                userId: user === null || user === void 0 ? void 0 : user.id,
                                staffId: interaction.user.id,
                                guildId: guild === null || guild === void 0 ? void 0 : guild.id,
                                reason: reason,
                            })];
                    case 1:
                        warnings = _b.sent();
                        return [2 /*return*/, {
                                custom: true,
                                content: "Added warning ".concat(warnings.id, " to <@").concat(user === null || user === void 0 ? void 0 : user.id, ">"),
                                allowedMentions: { users: [] },
                            }];
                    case 2:
                        if (!(subCommand === "remove")) return [3 /*break*/, 4];
                        return [4 /*yield*/, warn_schema_1.default.findByIdAndDelete(id)];
                    case 3:
                        warnings = _b.sent();
                        return [2 /*return*/, {
                                custom: true,
                                content: "Removed warning ".concat(warnings.id, " from <@").concat(user === null || user === void 0 ? void 0 : user.id, ">"),
                                allowedMentions: { users: [] },
                            }];
                    case 4:
                        if (!(subCommand === "list")) return [3 /*break*/, 6];
                        return [4 /*yield*/, warn_schema_1.default.find({
                                userId: user === null || user === void 0 ? void 0 : user.id,
                                guildId: guild === null || guild === void 0 ? void 0 : guild.id,
                            })];
                    case 5:
                        warnings = _b.sent();
                        description = "Warning for <@".concat(user === null || user === void 0 ? void 0 : user.id, ">:\n\n");
                        for (_i = 0, warnings_1 = warnings; _i < warnings_1.length; _i++) {
                            warn = warnings_1[_i];
                            description += "**ID:** ".concat(warn._id, "\n");
                            description += "**Date:** ".concat(warn.createdAt.toLocaleString(), "\n");
                            description += "**Staff:** ".concat(warn.staffId, "\n");
                            description += "**Reason:** ".concat(warn.reason, "\n\n");
                        }
                        embed = new discord_js_1.MessageEmbed().setDescription(description);
                        return [2 /*return*/, embed];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
