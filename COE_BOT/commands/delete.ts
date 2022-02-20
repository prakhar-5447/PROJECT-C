import { ICommand } from "wokcommands";
import axios from "axios";

export default {
  category: "api example",
  description: "example of a delete request",
  permission: ["ADMINISTARTOR"],
  //   requiredRoles:true,
  maxArgs: 1,
  minArgs: 1,
  expectedArgs: `<id>`,
  expectedArgsTypes: ["NUMBER"],
  slash: "both",
  testOnly: true,
  callback: async ({ args }) => {
    let uri = `https://jsonplaceholder.typicode.com/posts/${args[0]}`;
    const { data } = await axios.delete(uri);
    console.log(data);
  },
} as ICommand;
