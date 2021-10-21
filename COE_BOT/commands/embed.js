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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: "testing",
    description: "send an embed",
    slash: "both",
    testOnly: true,
    permissions: ["ADMINISTRATOR"],
    callback: function (_a) {
        var message = _a.message, text = _a.text;
        return __awaiter(void 0, void 0, void 0, function () {
            var date, newDate, embed, newMessage, newEmbed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        date = new Date(), newDate = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
                            " " +
                            [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
                        embed = new discord_js_1.MessageEmbed()
                            .setColor("#0099ff")
                            .setTitle("New Member Joined to Server")
                            .setURL("https://discord.js.org/")
                            .setAuthor("Welcome to CODERS EVOKE", "https://cdn.discordapp.com/attachments/884416707123359788/885532153146916874/ajax-loader.gif", "https://coders-evoke-community.github.io/CodersEvoke_website/")
                            .setDescription("<:favicon:885127725646491669> Thankyou for joining  {member.mention}  you are {guild.member_count}th member in server check {test.mention} channel")
                            .setThumbnail("https://cdn.discordapp.com/attachments/884416707123359788/885536600258404372/ajax-loader_1.gif")
                            .addFields([
                            { name: "Regular field title", value: "Some value here" },
                            { name: "\u200B", value: "\u200B" },
                            { name: "Inline field title", value: "Some value here", inline: true },
                            { name: "Inline field title", value: "Some value here", inline: true },
                        ])
                            .addField("Inline field title", "Some value here", true)
                            .setImage("https://media.discordapp.net/attachments/722437402685341766/801262293693890580/banner.gif")
                            // .setTimestamp()
                            .setFooter("member.avatar_url" + " " + '' + newDate, "https://i.imgur.com/AfFp7pu.png");
                        return [4 /*yield*/, message.reply({ embeds: [embed] })];
                    case 1:
                        newMessage = _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                    case 2:
                        _b.sent();
                        newEmbed = newMessage.embeds[0];
                        newEmbed.setTitle("edited title");
                        newMessage.edit({ embeds: [newEmbed] });
                        return [2 /*return*/];
                }
            });
        });
    },
};
