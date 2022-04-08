"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions = ["give", "remove", "has"];
exports.default = {
    category: "configuration",
    description: "give a role to user",
    permission: ["MANAGE_ROLES"],
    //   requiredRoles:true,
    minArgs: 3,
    expectedArgs: "<\"".concat(actions.join("\",\""), "\"> <user @> <roles @>"),
    slash: "both",
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "actions",
            description: "the action to perform one of the: ".concat(actions.join(",")),
            type: "STRING",
            required: true,
            choices: actions.map(function (action) { return ({ name: action, value: action }); }),
        },
        {
            name: "user",
            description: "the user to perform action on: ",
            type: "USER",
            required: true,
        },
        {
            name: "role",
            description: "the role to perform action on: ",
            type: "ROLE",
            required: true,
        },
    ],
    callback: function (_a) {
        var interaction = _a.interaction, guild = _a.guild, args = _a.args;
        if (!interaction) {
            return;
        }
        var action = args.shift();
        if (!action || !(actions === null || actions === void 0 ? void 0 : actions.includes(action))) {
            return "unknown action! please use one of following: ".concat(actions.join(","));
        }
        var memberId = args.shift().replace(/[<@!&>]/g, "");
        var roleId = args.shift().replace(/[<@!&>]/g, "");
        var member = guild.members.cache.get(memberId);
        var role = guild.roles.cache.get(roleId);
        if (!member) {
            return "could ot find member with id ".concat(memberId);
        }
        if (!role) {
            return "could ot find role with id ".concat(roleId);
        }
        if (action === "has") {
            return member.roles.cache.has(roleId)
                ? "user has role"
                : "user does not have role";
        }
        if (action === "give") {
            member.roles.add(role);
            return "role given";
        }
        if (action === "remove") {
            var flag = member.roles.cache.has(roleId) ? true : false;
            if (flag) {
                member.roles.remove(role);
                return "role remove";
            }
            return "user does not have this role";
        }
        return "unknown action";
    },
};
