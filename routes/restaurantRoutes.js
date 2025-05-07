const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

/**
 * GET /restaurants
 * Query Params: cuisine, location, rating, availability
 */
router.get("/", restaurantController.getData);

module.exports = router;
