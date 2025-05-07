
const express = require("express");
const { json } = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const restaurantRoutes = require("./routes/restaurantRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use(json());

app.get('/', (req, res) => {
   res.send('<h1>Welcome to Food Delivery Platform</h1>');
});

// Routes
app.use("/restaurants", restaurantRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
