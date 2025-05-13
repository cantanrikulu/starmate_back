const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const relationship = new Schema(
  {
    zodiacName: {
      type: String,
      required: true,
    },
    otherZodiacName: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
    },
  },
  { minimize: true, autoIndex: true, timestamps: true }
);

const Relationship = mongoose.model(
  "Relationship",
  relationship,
  "relationship"
);

module.exports = Relationship;
