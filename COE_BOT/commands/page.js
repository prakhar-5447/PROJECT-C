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
var embeds = [];
var pages = {};
for (var a = 0; a < 4; ++a) {
    embeds.push(new discord_js_1.MessageEmbed().setDescription("page ".concat(a + 1)));
}
var getRow = function (id) {
    var row = new discord_js_1.MessageActionRow();
    row.addComponents(new discord_js_1.MessageButton()
        .setCustomId("prev_embed")
        .setStyle("SECONDARY")
        .setEmoji("⏪")
        .setDisabled(pages[id] === 0));
    row.addComponents(new discord_js_1.MessageButton()
        .setCustomId("next_embed")
        .setStyle("SECONDARY")
        .setEmoji("⏩")
        .setDisabled(pages[id] === embeds.length - 1));
    return row;
};
exports.default = {
    category: "testing",
    description: "creates an embed pagination ",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var user = _a.user, message = _a.message, interaction = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, embed, reply, collector, filter, time;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = user.id;
                        pages[id] = pages[id] || 0;
                        embed = embeds[pages[id]];
                        filter = function (i) { return i.user.id === user.id; };
                        time = 1000 * 60 * 5;
                        if (!message) return [3 /*break*/, 2];
                        return [4 /*yield*/, message.reply({
                                embeds: [embed],
                                components: [getRow(id)],
                            })];
                    case 1:
                        reply = _b.sent();
                        collector = reply.createMessageComponentCollector({ filter: filter, time: time });
                        return [3 /*break*/, 3];
                    case 2:
                        interaction.reply({
                            embeds: [embed],
                            components: [getRow(id)],
                            ephemeral: true,
                        });
                        collector = channel.createMessageComponentCollector({ filter: filter, time: time });
                        _b.label = 3;
                    case 3:
                        collector.on("collect", function (btnInt) {
                            if (!btnInt)
                                return;
                            btnInt.deferUpdate();
                            if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed")
                                return;
                            if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                                --pages[id];
                            }
                            else if (btnInt.customId === "next_embed" &&
                                pages[id] < embeds.length - 1) {
                                ++pages[id];
                            }
                            if (reply) {
                                reply.edit({ embeds: [embeds[pages[id]]], components: [getRow(id)] });
                            }
                            else {
                                interaction.editReply({
                                    embeds: [embeds[pages[id]]],
                                    components: [getRow(id)],
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
};
