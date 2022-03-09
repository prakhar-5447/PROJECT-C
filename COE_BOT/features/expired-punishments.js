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
exports.config = void 0;
var punishment_schema_1 = __importDefault(require("../models/punishment-schema"));
exports.default = (function (client) {
    client.on("guildMemberAdd", function (member) { return __awaiter(void 0, void 0, void 0, function () {
        var result, muteRole, check;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, punishment_schema_1.default.findOne({
                        guildId: member.guild.id,
                        userId: member.id,
                        type: "mute",
                    })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        muteRole = member.guild.roles.cache.find(function (role) { return role.name === "Muted"; });
                        if (muteRole)
                            member.roles.add(muteRole);
                    }
                    check = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var query, results, _i, results_1, result_1, guildId, userId, type, guild, muteRole, member_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    query = { expire: { $lt: new Date() } };
                                    return [4 /*yield*/, punishment_schema_1.default.find(query)];
                                case 1:
                                    results = _a.sent();
                                    _i = 0, results_1 = results;
                                    _a.label = 2;
                                case 2:
                                    if (!(_i < results_1.length)) return [3 /*break*/, 5];
                                    result_1 = results_1[_i];
                                    guildId = result_1.guildId, userId = result_1.userId, type = result_1.type;
                                    return [4 /*yield*/, client.guilds.fetch(guildId)];
                                case 3:
                                    guild = _a.sent();
                                    if (!guild) {
                                        console.log("guild ".concat(guildId, " no longer uses this bot"));
                                        return [3 /*break*/, 4];
                                    }
                                    if (type === "ban") {
                                        guildId.members.unban(userId, "ban expires");
                                    }
                                    else if (type === "mute") {
                                        muteRole = guild.roles.cache.find(function (role) { return role.name === "Muted"; });
                                        if (!muteRole) {
                                            console.log("guild ".concat(guildId, " has no muted role"));
                                            return [3 /*break*/, 4];
                                        }
                                        member_1 = guildId.members.cache.get(userId);
                                        if (!member_1)
                                            return [3 /*break*/, 4];
                                        member_1.roles.remove(muteRole);
                                    }
                                    _a.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5: return [4 /*yield*/, punishment_schema_1.default.deleteMany(query)];
                                case 6:
                                    _a.sent();
                                    setTimeout(check, 1000 * 60);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    check();
                    return [2 /*return*/];
            }
        });
    }); });
});
exports.config = {
    dbname: "EXPIRED_PUNISHMENTS",
    displayNmae: "Expired Punishment",
};
