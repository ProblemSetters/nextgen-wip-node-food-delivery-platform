const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/restaurants.json");
const writePath = path.join(__dirname, "../data/updated_restaurants.json");

const readRestaurants = () => {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
};

const writeRestaurants = (restaurants) => {
  fs.writeFileSync(writePath, JSON.stringify(restaurants, null, 2));
};

exports.addMenuItem = async (req, res) => {
  
};

exports.getMenu = async (req, res) => {
  try {
    const menu = await menuService.getMenu(req.params.restaurantId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { itemId } = req.params;
  const updatedData = req.body;

  const result = await menuService.updateMenuItem(itemId, updatedData);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  res
    .status(200)
    .json({ message: "Menu item updated successfully", menu: result.menu });
};

exports.updateAvailability = async (req, res) => {
  const { itemId } = req.params;
  const { availability } = req.body;

  const result = await menuService.updateAvailability(itemId, availability);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  res
    .status(200)
    .json({ message: "Availability updated successfully", menu: result.menu });
};

exports.deleteMenuItem = async (req, res) => {
  const { itemId } = req.params;

  const result = await menuService.deleteMenuItem(itemId);
  if (result.error) {
    return res.status(404).json({ error: result.error });
  }
  res
    .status(500)
    .json({ message: "Menu item deleted successfully", menu: result.menu });
};
