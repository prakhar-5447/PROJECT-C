import { Client } from "discord.js";

export default (client: Client) => {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const statusOption = ["A GAME", "ANIME", "ON YOUTUBE","SPOTIFY","BOT's RACE","CHROME DINO","MOVIES","ON TWITCH","WYNK","LEADERBOARD"];
  //  activityType = [
  //   "PLAYING",
  //   "WATCHING",
  //   "STREAMING",
  //   "LISTENING",
  //   "COMPETING",
  // ];
  let counter = 0;
  let time=1000*5; //time in seconds to change status

  const updateStatus = async () => {
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: statusOption[counter],
          type: "PLAYING",
        },
      ],
    });
    await delay(time);
    counter++;
    
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: statusOption[counter],
          type: "WATCHING",
        },
      ],
    });
    await delay(time);
    counter++;
    
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: statusOption[counter],
          type: "STREAMING",
        },
      ],
    });
    await delay(time);
    counter++;
    
    client.user?.setPresence({
        status: "online",
        activities: [
          {
          name: statusOption[counter],
          type: "LISTENING",
        },
      ],
    });
    await delay(time);
    counter++;
    
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: statusOption[counter],
          type: "COMPETING",
        },
      ],
    });
    await delay(time);
    counter++;

    if (counter >= statusOption.length) {
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
