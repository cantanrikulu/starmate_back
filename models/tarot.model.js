const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tarotSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    reversedDescription: { type: Schema.Types.String },
    tarotPhoto: { type: String, trim: true },
  },
  {
    minimize: true,
    timestamps: true,
    autoIndex: true,
  }
);

const Tarot = mongoose.model("Tarot", tarotSchema, "tarot");

module.exports = Tarot;
