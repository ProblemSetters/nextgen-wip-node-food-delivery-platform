const express = require("express");
const { json } = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = process.env.PORT || 8000;

const restaurantRoutes = require("./routes/restaurantRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use(json());

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery Platform API",
      version: "1.0.0",
      description: "API documentation for the Food Delivery Platform",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirect root URL to Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use("/restaurants", restaurantRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
