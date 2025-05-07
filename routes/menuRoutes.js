const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

const { validateMenu } = require("../middleware/validateMenu");

router.post("/:restaurantId", validateMenu, menuController.addMenuItem);

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: API to manage menu items
 */

/**
 * @swagger
 * /menu/{restaurantId}:
 *   post:
 *     summary: Add a new menu item to a restaurant
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant to add the menu item to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               category:
 *                 type: string
 *               availability:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 menu:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       category:
 *                         type: string
 *                       availability:
 *                         type: boolean
 *       404:
 *         description: Restaurant with ID ${restaurantId} not found.
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 *                     example:
 *                       - field: "itemId"
 *                         message: "Item ID is required."
 *                       - field: "name"
 *                         message: "Field name is required."
 *                       - field: "price"
 *                         message: "Price must be a valid number greater than 0."
 *                       - field: "price"
 *                         message: "Price is required."
 *                       - field: "category"
 *                         message: "Category is required."
 *                       - field: "availability"
 *                         message: "Availability should be boolean."
 *                       - field: "availability"
 *                         message: "Availability is required."
 */

module.exports = router;
