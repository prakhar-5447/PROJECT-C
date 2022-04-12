import mongoose, { Schema } from "mongoose";
const reqstring = { type: String, required: true };

const welcomeSchema = new Schema({
  // Guild ID
  _id: reqstring,
  // Channel ID
  channelId: reqstring,
});

const name = "welcome-schema";

export default mongoose.models[name] || mongoose.model(name, welcomeSchema,name);
