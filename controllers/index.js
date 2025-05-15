const blogController = require("./blog.controller");
const userController = require("./user.controller");
const zodiacController=require("./zodiac.controller");

module.exports = {
  blog: blogController,
  user: userController,
  zodiac: zodiacController,
};
