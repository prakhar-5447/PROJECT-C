import { Client } from "discord.js";

export default (client: Client) => {
  const statusOption = ["hello", "test", "running"];
  let counter = 0;
  const updateStatus = () => {
    client.user?.setPresence({
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
};

export const config = {
  displayName: "status",
  dbName: "STATUS_CHANGER",
};
