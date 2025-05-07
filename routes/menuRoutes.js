const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

const { validateMenu } = require("../middleware/validateMenu");

router.post("/:restaurantId", validateMenu, menuController.addMenuItem);

module.exports = router;
