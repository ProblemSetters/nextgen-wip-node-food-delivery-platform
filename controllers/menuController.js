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
