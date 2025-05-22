const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.post(
  "/register",
  [validation.userValidation.validateRegister()],
  controller.user.register
);

router.post(
  "/login",
  [validation.userValidation.validateLogin()],
  controller.user.login
);

router.put(
  "/updateUser/:userId",
  [validation.userValidation.validateUpdateUser()],
  controller.user.updateUser
);

router.get("/getAllUsers", controller.user.getAllUsers);

router.put(
  "/changePassword/:id",
  [validation.userValidation.validateChangePassword()],
  controller.user.changePassword
);

router.get("/getUserLikedBlogs/:userId", controller.user.getUserLikedBlogs);

router.get(
  "/getUserLikedByZodiacs/:userId",
  controller.user.getUserLikedByZodiacs
);

router.get(
  "/getUserLikedByRelationships/:userId",
  controller.user.getUserLikedByRelationships
);

router.delete("/deleteUser/:userId", controller.user.deleteUser);

module.exports = {
  user: router,
};
