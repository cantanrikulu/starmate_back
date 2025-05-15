const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.put("/addOrUpdateHoroscope", controller.zodiac.addOrUpdateHoroscope);
router.get("/getAllZodiacs", controller.zodiac.getAllUsers);

module.exports = {
    zodiac: router,
  };