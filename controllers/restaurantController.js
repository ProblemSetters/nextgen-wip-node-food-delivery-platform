const fs = require("fs");
const path = require("path");

const restaurants = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/restaurants.json"), "utf8")
);

exports.getData = (req, res) => {
    
};