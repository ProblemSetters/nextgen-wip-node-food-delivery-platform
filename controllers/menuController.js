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


const addItem = async (restaurantId, menuItem) => {
    let restaurants = await readRestaurants();
    const restaurantIndex = restaurants.findIndex((r) => r.id === restaurantId);
  
    if (restaurantIndex === -1) {
      const error = new Error(`Restaurant with ID ${restaurantId} not found.`);
      error.status = 404;
      throw error;
    }
  
    restaurants[restaurantIndex].menu.push(menuItem);
    await writeRestaurants(restaurants);
  
    return restaurants[restaurantIndex].menu;
  };
  
  exports.addMenuItem = async (req, res) => {
    const { restaurantId } = req.params;
    const newItem = req.body;
  
    const result = await addItem(restaurantId, newItem);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res
      .status(201)
      .json({ message: "Menu item added successfully", menu: result });
  };
