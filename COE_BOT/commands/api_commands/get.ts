import { ICommand } from "wokcommands";
import axios from "axios";

export default {
  category: "api example",
  description: "example of a get request",
  permission: ["ADMINISTARTOR"],
  //   requiredRoles:true,
  maxArgs: 1,
  expectedArgs: `<id>`,
  expectedArgsTypes: ["NUMBER"],
  slash: "both",
  testOnly: true,
  callback: async ({ args }) => {
    let uri = "https://jsonplaceholder.typicode.com/posts";
    if (args.length) {
      uri += `/${args[0]}`;
    }
    const { data } = await axios.get(uri);
    console.log(data);
  },
} as ICommand;
