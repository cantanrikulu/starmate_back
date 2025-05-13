const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const zodiacSchema = new Schema(
  {
    name: { type: String },
    daily: [
      {
        title: {
          type: Schema.Types.String,
          required: true,
        },
        text: {
          type: Schema.Types.String,
          required: false,
        },
      },
    ],
    weekly: [
      {
        title: {
          type: Schema.Types.String,
          required: true,
        },
        text: {
          type: Schema.Types.String,
          required: false,
        },
      },
    ],
    monthly: [
      {
        title: {
          type: Schema.Types.String,
          required: true,
        },
        text: {
          type: Schema.Types.String,
          required: false,
        },
      },
    ],
    yearly: [
      {
        title: {
          type: Schema.Types.String,
          required: true,
        },
        text: {
          type: Schema.Types.String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true, minimize: true, autoIndex: true }
);

const Zodiac = mongoose.model("Zodiac", zodiacSchema, "zodiac");

module.exports = Zodiac;
