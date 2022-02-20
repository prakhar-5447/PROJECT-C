import { ICommand } from "wokcommands";
import axios from "axios";

export default {
  category: "api example",
  description: "example of a post request",
  permission: ["ADMINISTARTOR"],
  //   requiredRoles:true,
  slash: "both",
  testOnly: true,
  callback: async ({}) => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  },
} as ICommand;
