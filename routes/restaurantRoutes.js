const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.getData);

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API to manage restaurants
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: cuisine
 *         required: false
 *         description: Filter by cuisine type
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         required: false
 *         description: Filter by location
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         required: false
 *         description: Minimum rating
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: available
 *         required: false
 *         description: Whether the restaurant is currently available
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   cuisine:
 *                     type: array
 *                     items:
 *                       type: string
 *                   rating:
 *                     type: number
 *                     format: float
 *                   availability:
 *                     type: boolean
 *                   menu:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         itemId:
 *                           type: string
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                           format: float
 *                         category:
 *                           type: string
 *                         availability:
 *                           type: boolean
 */

module.exports = router;
