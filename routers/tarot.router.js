const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.post("/createTarotCard", controller.tarot.createTarotCard);
router.delete("/deleteTarotCard/:tarotId", controller.tarot.deleteTarotCard);
router.get("/getAllTarotCards", controller.tarot.getAllTarotCards);
router.post("/getTarotFortune", controller.tarot.getTarotFortune);
router.post("/uploadTarotPhoto/:tarotId", controller.tarot.uploadTarotPhoto);
module.exports = {
  tarot: router,
};
