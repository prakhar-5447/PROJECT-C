import mongoose, { Schema } from "mongoose";
const reqstring = { type: String, required: true };

const welcomeSchema = new Schema({
  // Guild ID
  _id: reqstring,
  // Channel ID
  channelId: reqstring,
  text: reqstring,
});

const name = "welcome-tutorial";

export default mongoose.models[name] || mongoose.model(name, welcomeSchema,name);
