const fs = require("fs");
const path = require("path");

const restaurants = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/restaurants.json"), "utf8")
);

exports.getData = (req, res) => {
    const { cuisine, location, rating, availability } = req.query;

  let filteredRestaurants = restaurants;

  if (cuisine) {
    filteredRestaurants = filteredRestaurants.filter((restaurant) =>
      restaurant.cuisine.some((c) => c.toLowerCase() === cuisine.toLowerCase())
    );
  }
  if (location) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.location.toLowerCase() === location.toLowerCase()
    );
  }
  if (rating) {
    const minRating = parseFloat(rating);
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.rating >= minRating
    );
  }
  if (availability !== undefined) {
    const isAvailable = availability === "true";
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.availability === isAvailable
    );
  }

  res.status(200).json(filteredRestaurants);
};