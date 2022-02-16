"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (function (client) {
    var statusOption = ["hello", "test", "running"];
    var counter = 0;
    var updateStatus = function () {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: "online",
            activities: [
                {
                    name: statusOption[counter],
                },
            ],
        });
        if (++counter >= statusOption.length) {
            counter = 0;
        }
        setTimeout(updateStatus, 1000 * 5);
    };
    updateStatus();
});
exports.config = {
    displayName: "status",
    dbName: "STATUS_CHANGER",
};
