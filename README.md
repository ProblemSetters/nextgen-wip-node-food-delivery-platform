# NodeJS: Restaurant Search and Menu Handling

A food delivery platform requires an API to enable users to search for restaurants based on filters like cuisine, location, rating, and availability. Additionally, the platform needs functionality to add new menu items to restaurants, ensuring all fields are validated before being added to maintain data integrity. This API aims to streamline restaurant searches and menu management while safeguarding data consistency.

## Context
We have read-only restaurant data in `data/restaurants.json`, where each object contains details about individual restaurants, including metadata and a list of menu items.

## API Expectations:

### 1. Get Restaurants by Filter
**Endpoint:** `GET /restaurants`

#### Query Parameters:
| Parameter   | Description                                              | Case Sensitivity |
|-------------|----------------------------------------------------------|------------------|
| `cuisine`   | Filter by cuisine type (e.g., Indian, Chinese, Italian)  | Case Insensitive |
| `location`  | Filter by location (e.g., New York, San Francisco)       | Case Insensitive |
| `rating`    | Minimum rating (e.g., 3.5 returns restaurants with ≥ 3.5)| Case Insensitive |
| `available` | Whether the restaurant is currently available (`true` or `false`) | Case Insensitive |

#### Notes:
- All filters are optional. If no query parameters are provided, all restaurants are returned.
- Multiple filters can be used in combination.
- All API responses are in JSON format.

#### Response:
- **Status Code:** `200`
- **Format:**
  ```json
  [
     {
        "id": "1",
        "name": "Tasty Bites",
        "location": "Downtown",
        "cuisine": ["Indian", "Chinese"],
        "rating": 4.5,
        "availability": true,
        "menu": [
           {
              "itemId": "201",
              "name": "Butter Chicken",
              "price": 12.99,
              "category": "Main Course",
              "availability": true
           },
           {
              "itemId": "202",
              "name": "Fried Rice",
              "price": 8.99,
              "category": "Main Course",
              "availability": true
           }
        ]
     }
  ]
  ```

---

### 2. Add New Menu Item to Restaurant
**Endpoint:** `POST /menu/:restaurantId`

#### Sample Request Body:
```json
{
  "itemId": "901",
  "name": "Grilled Sandwich",
  "price": 6.99,
  "category": "Snacks",
  "availability": true
}
```

#### Middleware:
`middleware/validateMenu.js` - Responsible for validating all input fields before processing the request.

#### Validation Rules:
| Status Code | Message                                     | Cause                                     |
|-------------|---------------------------------------------|-------------------------------------------|
| `201`       | Menu item added successfully               | Menu item is added successfully           |
| `404`       | Restaurant with ID ${restaurantId} not found. | No restaurant exists with the given ID    |
| `400`       | Item ID is required.                       | `itemId` is missing                       |
| `400`       | Field name is required.                    | `name` is missing                         |
| `400`       | Price must be a valid number greater than 0. | Price is ≤ 0                           |
| `400`       | Price is required.                         | `price` is missing                        |
| `400`       | Category is required.                      | `category` is missing                     |
| `400`       | Availability should be boolean.            | Availability is not `true` or `false`     |
| `400`       | Availability is required.                  | `availability` is missing                 |

#### Response:
**On Success:**
```
{
   "message": "Menu item added successfully",
   "menu": [
      ... (existing menu items),
      {
         "itemId": "901",
         "name": "Grilled Sandwich",
         "price": 6.99,
         "category": "Snacks",
         "availability": true
      }
   ]
}
```

**On Failure:**
```
{
  "errors": [
    {
      "field": "price",
      "message": "Price must be a valid number greater than 0."
    },
    {
      "field": "availability",
      "message": "Availability should be boolean."
    }
  ]
}
```

## Data Handling
- **Input Data:** `data/restaurants.json` (read-only file).
- **Output Data:** Upon a successful POST request, a new file `data/updated_restaurants.json` is created to store the latest restaurant and menu data.
- **Note:** The original `restaurants.json` file remains unmodified.

## Commands

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm run test:task1
```
