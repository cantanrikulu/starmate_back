const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const horoscopeSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const zodiacSchema = new Schema(
  {
    name: { type: String, required: true },
    daily: [horoscopeSchema],
    weekly: [horoscopeSchema],
    monthly: [horoscopeSchema],
    yearly: [horoscopeSchema],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, minimize: true, autoIndex: true }
);

const Zodiac = mongoose.model("Zodiac", zodiacSchema, "zodiac");

module.exports = Zodiac;
