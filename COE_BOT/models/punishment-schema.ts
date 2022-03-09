import mongoose, { Schema } from "mongoose";
const reqstring = { type: String, required: true };

const schema = new Schema(
  {
    // User ID
    userId: reqstring,
    // Guild ID
    guildId: reqstring,
    staffId: reqstring,
    reason: reqstring,
    expire: Date,
    type: { type: String, required: true, enum: ["ban", "mute"] },
  },
  {
    timestamps: true,
  }
);

const name = "punishment";

export default mongoose.models[name] || mongoose.model(name, schema, name);
