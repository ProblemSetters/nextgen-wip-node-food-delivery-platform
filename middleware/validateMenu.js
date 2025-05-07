exports.validateMenu = (req, res, next) => {
  const { itemId, name, price, category, availability } = req.body;
  let errors = [];

  if (!itemId)
    errors.push({ field: "itemId", message: "Item ID is required." });
  if (!name) errors.push({ field: "name", message: "Field name is required." });
  if (!category)
    errors.push({ field: "category", message: "Category is required." });
  if (price === undefined)
    errors.push({ field: "price", message: "Price is required." });
  if (availability === undefined)
    errors.push({
      field: "availability",
      message: "Availability is required.",
    });

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    errors.push({
      field: "price",
      message: "Price must be a valid number greater than 0.",
    });
  }

  if (availability !== undefined && typeof availability !== "boolean") {
    errors.push({
      field: "availability",
      message: "Availability should be boolean.",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
