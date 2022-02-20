import { ICommand } from "wokcommands";

const actions = ["give", "remove", "has"];
export default {
  category: "configuration",
  description: "give a role to user",
  permission: ["MANAGE_ROLES"],
  //   requiredRoles:true,
  minArgs: 3,
  expectedArgs: `<"${actions.join(`","`)}"> <user @> <roles @>`,
  slash: "both",
  testOnly: true,
  guildOnly: true,
  options: [
    {
      name: "actions",
      description: `the action to perform one of the: ${actions.join(",")}`,
      type: "STRING",
      required: true,
      choices: actions.map((action) => ({ name: action, value: action })),
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
  callback: ({ guild, args }) => {
    const action = args.shift();
    if (!action || !actions?.includes(action)) {
      return `unknown action! please use one of following: ${actions.join(
        ","
      )}`;
    }

    const memberId = args.shift()!.replace(/[<@!&>]/g, "");
    const roleId = args.shift()!.replace(/[<@!&>]/g, "");
    const member = guild!.members.cache.get(memberId);
    const role = guild!.roles.cache.get(roleId);

    if (!member) {
      return `could ot find member with id ${memberId}`;
    }
    if (!role) {
      return `could ot find role with id ${roleId}`;
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
      member.roles.remove(role);
      return "role remove";
    }
    return "unknown action";
  },
} as ICommand;
