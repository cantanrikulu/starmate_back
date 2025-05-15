const blogRouter = require("./blog.router").blog;
const userRouter = require("./user.router").user;
const zodiacRouter = require("./zodiac.router").zodiac;
module.exports = {
  blogRouter,
  userRouter,
  zodiacRouter,
};
