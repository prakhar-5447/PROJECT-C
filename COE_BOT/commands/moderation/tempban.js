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
var punishment_schema_1 = __importDefault(require("../../models/punishment-schema"));
exports.default = {
    category: "moderation",
    description: "temporary ban a user ",
    slash: "both",
    testOnly: true,
    permissions: ["ADMINISTRATOR"],
    // requireRoles: true,
    minArgs: 3,
    expectedArgs: "<user> <duration> <reason>",
    expectedArgsTypes: ["USER", "STRING", "STRING"],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, client = _a.client, guild = _a.guild, args = _a.args, staff = _a.member;
        return __awaiter(void 0, void 0, void 0, function () {
            var userId, duration, reason, user, time, type, split, expires, result, ignore_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!guild)
                            return [2 /*return*/, "you can only use it in a server"];
                        userId = args.shift();
                        duration = args.shift();
                        reason = args.join(" ");
                        if (message) {
                            user = (_b = message.mentions.users) === null || _b === void 0 ? void 0 : _b.first();
                        }
                        else {
                            user = interaction.options.getUser("user");
                        }
                        if (!!user) return [3 /*break*/, 2];
                        userId = userId.replace(/[<@!>]/g, "");
                        return [4 /*yield*/, client.users.fetch(userId)];
                    case 1:
                        user = _c.sent();
                        if (!user)
                            return [2 /*return*/, "could not find user with ".concat(userId)];
                        _c.label = 2;
                    case 2:
                        userId = user.id;
                        try {
                            split = duration.match(/\d+|\D+/g);
                            time = parseInt(split[0]);
                            type = split[1].toLowerCase();
                        }
                        catch (e) {
                            return [2 /*return*/, 'invalid time format Example format: "10d" where d = days,h= hours and m= minutes'];
                        }
                        if (type === "h") {
                            time *= 60;
                        }
                        else if (type === "d") {
                            time *= 60 * 24;
                        }
                        else if (type !== "m") {
                            return [2 /*return*/, "please use m, h, d for minute, hours and day respectively"];
                        }
                        expires = new Date();
                        expires.setMinutes(expires.getMinutes() + time);
                        return [4 /*yield*/, punishment_schema_1.default.findOne({
                                guildId: guild.id,
                                userId: userId,
                                type: "ban",
                            })];
                    case 3:
                        result = _c.sent();
                        if (result)
                            return [2 /*return*/, "<@".concat(userId, "> is already banned in the server")];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, guild.members.ban(userId, { days: 7, reason: reason })];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, new punishment_schema_1.default({
                                userId: userId,
                                guildId: guild.id,
                                staffId: staff.id,
                                reason: reason,
                                expires: expires,
                                type: "ban",
                            }).save()];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ignore_1 = _c.sent();
                        return [2 /*return*/, "cannot ban that user"];
                    case 8: return [2 /*return*/, "<@".concat(userId, "> has been banned for ").concat(duration)];
                }
            });
        });
    },
};
