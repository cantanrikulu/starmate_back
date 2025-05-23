const blogController = require("./blog.controller");
const userController = require("./user.controller");
const zodiacController = require("./zodiac.controller");
const relationshipController = require("./relationship.controller");
const tarotController = require("./tarot.controller");

module.exports = {
  blog: blogController,
  user: userController,
  zodiac: zodiacController,
  relationship:relationshipController,
  tarot:tarotController,
};
