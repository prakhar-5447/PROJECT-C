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
exports.config = void 0;
exports.default = (function (client) {
    function delay(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    var statusOption = ["A GAME", "ANIME", "ON YOUTUBE", "SPOTIFY", "BOT's RACE", "CHROME DINO", "MOVIES", "ON TWITCH", "WYNK", "LEADERBOARD"];
    //  activityType = [
    //   "PLAYING",
    //   "WATCHING",
    //   "STREAMING",
    //   "LISTENING",
    //   "COMPETING",
    // ];
    var counter = 0;
    var time = 1000 * 5; //time in seconds to change status
    var updateStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
                        status: "online",
                        activities: [
                            {
                                name: statusOption[counter],
                                type: "PLAYING",
                            },
                        ],
                    });
                    return [4 /*yield*/, delay(time)];
                case 1:
                    _f.sent();
                    counter++;
                    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({
                        status: "online",
                        activities: [
                            {
                                name: statusOption[counter],
                                type: "WATCHING",
                            },
                        ],
                    });
                    return [4 /*yield*/, delay(time)];
                case 2:
                    _f.sent();
                    counter++;
                    (_c = client.user) === null || _c === void 0 ? void 0 : _c.setPresence({
                        status: "online",
                        activities: [
                            {
                                name: statusOption[counter],
                                type: "STREAMING",
                            },
                        ],
                    });
                    return [4 /*yield*/, delay(time)];
                case 3:
                    _f.sent();
                    counter++;
                    (_d = client.user) === null || _d === void 0 ? void 0 : _d.setPresence({
                        status: "online",
                        activities: [
                            {
                                name: statusOption[counter],
                                type: "LISTENING",
                            },
                        ],
                    });
                    return [4 /*yield*/, delay(time)];
                case 4:
                    _f.sent();
                    counter++;
                    (_e = client.user) === null || _e === void 0 ? void 0 : _e.setPresence({
                        status: "online",
                        activities: [
                            {
                                name: statusOption[counter],
                                type: "COMPETING",
                            },
                        ],
                    });
                    return [4 /*yield*/, delay(time)];
                case 5:
                    _f.sent();
                    counter++;
                    if (counter >= statusOption.length) {
                        counter = 0;
                    }
                    setTimeout(updateStatus, 1000 * 5);
                    return [2 /*return*/];
            }
        });
    }); };
    updateStatus();
});
exports.config = {
    displayName: "status",
    dbName: "STATUS_CHANGER",
};
