import mongoose, { Schema } from "mongoose";
const reqstring = { type: String, required: true };

const schema = new Schema(
  {
    // User ID
    userId: reqstring,
    // Guild ID
    guildId: reqstring,
    reason: reqstring,
    staffId: reqstring,
  },
  {
    timestamps: true,
  }
);

const name = "warns";

export default mongoose.models[name] || mongoose.model(name, schema, name);
