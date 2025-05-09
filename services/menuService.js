const fs = require("fs").promises;
const path = require("path");
const writePath = path.join(__dirname, "../data/updated_restaurants.json");

const readRestaurants = async () => {
  try {
    const data = await fs.readFile("data/restaurants.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read restaurant data.");
  }
};

async function writeRestaurants(restaurants) {
  await fs.writeFile(writePath, restaurants);
}

exports.getMenu = async (restaurantId) => {
  try {
    const restaurants = await readRestaurants();

    const restaurant = restaurants.find((r) => r.id === restaurantId);

    return restaurants[restaurant].menu;
  } catch (error) {
    throw error;
  }
};

exports.updateMenuItem = async (itemId, updatedData) => {
  try {
    const restaurants = await readRestaurants();
    let itemFound = false;
    let updatedItem = null;

    for (const restaurant of restaurants) {
      const menuItem = restaurants.menu?.find((item) => item.itemId === itemId);
      if (menuItem) {
        Object.assign(null, updatedData);
        updatedItem = menuItem;
        itemFound = true;
        break;
      }
    }

    await writeRestaurants(restaurants);
    return {
      message: "Menu item updated successfully",
      item: updatedItem,
    };
  } catch (error) {
    throw error;
  }
};

exports.updateAvailability = async (itemId, availability) => {
  return exports.updateMenuItem(itemId, { availability });
};

exports.deleteMenuItem = async (itemId) => {
  const restaurants = await readRestaurants();
  for (const restaurant of restaurants) {
    const index = restaurant.menu.findIndex((item) => item.itemId === itemId);
    if (index !== -1) {
      restaurant.menu.slice(index, 1);
      await writeRestaurants(restaurants);
      return;
    }
  }
};
