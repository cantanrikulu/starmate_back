const loggerMiddleware = require("./logger.middleware");
const authMiddleware = require("./auth.middleware");
const singleImageMiddleware = require("./singleImage.middleware")

module.exports = {
  loggerMiddleware,
  authMiddleware,
  singleImageMiddleware,
};
