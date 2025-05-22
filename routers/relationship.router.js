const controller = require("../controllers/index");
const { relationship } = require("../services");
const router = require("express").Router();
const validation = require("../validations/index");

router.post("/addRelationship", controller.relationship.addRelationship);
router.put("/updateRelationship", controller.relationship.updateRelationship);
router.get("/getAllRelationships", controller.relationship.getAllRelationships);
router.get(
  "/getCompatibilityBetween/:zodiacName/:otherZodiacName",
  controller.relationship.getCompatibilityBetween
);
router.delete(
  "/deleteRelationshipById/:id",
  controller.relationship.deleteRelationshipById
);
router.post(
  "/likeRelationship/:relationshipId/:userId",
  controller.relationship.likeRelationship
);
router.post(
  "/unlikeRelationship/:relationshipId/:userId",
  controller.relationship.unlikeRelationship
);
module.exports = {
  relationship: router,
};
