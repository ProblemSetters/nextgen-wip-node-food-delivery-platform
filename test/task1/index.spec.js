const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../index");
const should = chai.should();
const fs = require("fs").promises;
const path = require("path");

chai.use(chaiHttp);
const originalDataPath = path.join(__dirname, "../../data/restaurants.json");
const testDataPath = path.join(
  __dirname,
  "../../data/updated_restaurants.json"
);

describe("Restaurant Search API", () => {
  it("should GET all restaurants", (done) => {
    chai
      .request(app)
      .get("/restaurants")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.have.length(6);
        const expectedData = require("../../data/restaurants.json");
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by cuisine", (done) => {
    chai
      .request(app)
      .get("/restaurants?cuisine=Indian")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(1);
        const expectedData = [
          {
            id: "1",
            name: "Tasty Bites",
            location: "Downtown",
            cuisine: ["Indian", "Chinese"],
            rating: 4.5,
            availability: true,
            menu: [
              {
                itemId: "201",
                name: "Butter Chicken",
                price: 12.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "202",
                name: "Fried Rice",
                price: 8.99,
                category: "Main Course",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by cuisine (case-insensitive)", (done) => {
    chai
      .request(app)
      .get("/restaurants?cuisine=mExiCAn")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(1);
        const expectedData = [
          {
            id: "5",
            name: "Taco Fiesta",
            location: "Suburbs",
            cuisine: ["Mexican"],
            rating: 4.6,
            availability: false,
            menu: [
              {
                itemId: "208",
                name: "Chicken Tacos",
                price: 7.99,
                category: "Main Course",
                availability: false,
              },
              {
                itemId: "209",
                name: "Guacamole",
                price: 5.49,
                category: "Appetizer",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by location", (done) => {
    chai
      .request(app)
      .get("/restaurants?location=Downtown")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(2);
        const expectedData = [
          {
            id: "1",
            name: "Tasty Bites",
            location: "Downtown",
            cuisine: ["Indian", "Chinese"],
            rating: 4.5,
            availability: true,
            menu: [
              {
                itemId: "201",
                name: "Butter Chicken",
                price: 12.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "202",
                name: "Fried Rice",
                price: 8.99,
                category: "Main Course",
                availability: true,
              },
            ],
          },
          {
            id: "4",
            name: "Burger Barn",
            location: "Downtown",
            cuisine: ["American"],
            rating: 4.3,
            availability: true,
            menu: [
              {
                itemId: "206",
                name: "Cheeseburger",
                price: 9.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "207",
                name: "French Fries",
                price: 3.99,
                category: "Side",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by location (case-insensitive)", (done) => {
    chai
      .request(app)
      .get("/restaurants?location=midTOWn")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(2);
        const expectedData = [
          {
            id: "3",
            name: "Sushi Haven",
            location: "Midtown",
            cuisine: ["Japanese"],
            rating: 4.8,
            availability: true,
            menu: [
              {
                itemId: "204",
                name: "Salmon Sushi",
                price: 15.99,
                category: "Sushi",
                availability: true,
              },
              {
                itemId: "205",
                name: "Miso Soup",
                price: 4.99,
                category: "Soup",
                availability: true,
              },
            ],
          },
          {
            id: "6",
            name: "Vegan Delight",
            location: "Midtown",
            cuisine: ["Vegan"],
            rating: 4.7,
            availability: true,
            menu: [
              {
                itemId: "210",
                name: "Vegan Burger",
                price: 10.49,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "211",
                name: "Quinoa Salad",
                price: 8.99,
                category: "Salad",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by minimum rating", (done) => {
    chai
      .request(app)
      .get("/restaurants?rating=4.7")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(2);
        const expectedData = [
          {
            id: "3",
            name: "Sushi Haven",
            location: "Midtown",
            cuisine: ["Japanese"],
            rating: 4.8,
            availability: true,
            menu: [
              {
                itemId: "204",
                name: "Salmon Sushi",
                price: 15.99,
                category: "Sushi",
                availability: true,
              },
              {
                itemId: "205",
                name: "Miso Soup",
                price: 4.99,
                category: "Soup",
                availability: true,
              },
            ],
          },
          {
            id: "6",
            name: "Vegan Delight",
            location: "Midtown",
            cuisine: ["Vegan"],
            rating: 4.7,
            availability: true,
            menu: [
              {
                itemId: "210",
                name: "Vegan Burger",
                price: 10.49,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "211",
                name: "Quinoa Salad",
                price: 8.99,
                category: "Salad",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by availability", (done) => {
    chai
      .request(app)
      .get("/restaurants?availability=true")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(4);
        const expectedData = [
          {
            id: "1",
            name: "Tasty Bites",
            location: "Downtown",
            cuisine: ["Indian", "Chinese"],
            rating: 4.5,
            availability: true,
            menu: [
              {
                itemId: "201",
                name: "Butter Chicken",
                price: 12.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "202",
                name: "Fried Rice",
                price: 8.99,
                category: "Main Course",
                availability: true,
              },
            ],
          },
          {
            id: "3",
            name: "Sushi Haven",
            location: "Midtown",
            cuisine: ["Japanese"],
            rating: 4.8,
            availability: true,
            menu: [
              {
                itemId: "204",
                name: "Salmon Sushi",
                price: 15.99,
                category: "Sushi",
                availability: true,
              },
              {
                itemId: "205",
                name: "Miso Soup",
                price: 4.99,
                category: "Soup",
                availability: true,
              },
            ],
          },
          {
            id: "4",
            name: "Burger Barn",
            location: "Downtown",
            cuisine: ["American"],
            rating: 4.3,
            availability: true,
            menu: [
              {
                itemId: "206",
                name: "Cheeseburger",
                price: 9.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "207",
                name: "French Fries",
                price: 3.99,
                category: "Side",
                availability: true,
              },
            ],
          },
          {
            id: "6",
            name: "Vegan Delight",
            location: "Midtown",
            cuisine: ["Vegan"],
            rating: 4.7,
            availability: true,
            menu: [
              {
                itemId: "210",
                name: "Vegan Burger",
                price: 10.49,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "211",
                name: "Quinoa Salad",
                price: 8.99,
                category: "Salad",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should GET restaurants filtered by multiple query parameters", (done) => {
    chai
      .request(app)
      .get(
        "/restaurants?cuisine=Indian&location=Downtown&rating=4.0&availability=true"
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(1);
        const expectedData = [
          {
            id: "1",
            name: "Tasty Bites",
            location: "Downtown",
            cuisine: ["Indian", "Chinese"],
            rating: 4.5,
            availability: true,
            menu: [
              {
                itemId: "201",
                name: "Butter Chicken",
                price: 12.99,
                category: "Main Course",
                availability: true,
              },
              {
                itemId: "202",
                name: "Fried Rice",
                price: 8.99,
                category: "Main Course",
                availability: true,
              },
            ],
          },
        ];
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("should return nothing if no restaurants match the criteria", (done) => {
    chai
      .request(app)
      .get("/restaurants?cuisine=Thai")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(0);
        done();
      });
  });
});

describe("Menu API", () => {
  let originalData;

  before(async () => {
    try {
      await fs.access(testDataPath);
      await fs.unlink(testDataPath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    originalData = JSON.parse(await fs.readFile(originalDataPath, "utf-8"));
  });

  after(async () => {
    try {
      await fs.access(testDataPath);
      await fs.unlink(testDataPath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  });

  describe("POST /menu/:restaurantId", () => {
    const validMenuItem = {
      itemId: "M1",
      name: "Veg Biryani",
      price: 10.99,
      category: "Main Course",
      availability: true,
    };

    it("should fail if itemId is missing", (done) => {
      const invalidMenuItem = { ...validMenuItem };
      delete invalidMenuItem.itemId;

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal("Item ID is required.");
          done();
        });
    });

    it("should fail if name is missing", (done) => {
      const invalidMenuItem = { ...validMenuItem };
      delete invalidMenuItem.name;

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal(
            "Field name is required."
          );
          done();
        });
    });

    it("should fail if price is not a valid number", (done) => {
      const invalidMenuItem = { ...validMenuItem, price: "invalid" };

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal(
            "Price must be a valid number greater than 0."
          );
          done();
        });
    });

    it("should fail if price is zero or negative", (done) => {
      const invalidMenuItem = { ...validMenuItem, price: -5 };

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal(
            "Price must be a valid number greater than 0."
          );
          done();
        });
    });

    it("should fail if category is missing", (done) => {
      const invalidMenuItem = { ...validMenuItem };
      delete invalidMenuItem.category;

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal("Category is required.");
          done();
        });
    });

    it("should fail if availability is not boolean", (done) => {
      const invalidMenuItem = { ...validMenuItem, availability: "yes" };

      chai
        .request(app)
        .post("/menu/1")
        .send(invalidMenuItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0].message).to.equal(
            "Availability should be boolean."
          );
          done();
        });
    });

    it("should add a valid menu item", async () => {
      const fileData = JSON.parse(await fs.readFile(originalDataPath, "utf-8"));
      const restaurant = fileData.find((r) => r.id === "1");

      expect(restaurant).to.exist;
      expect(restaurant.menu).to.be.an("array");

      const initialMenu = restaurant.menu;
      const initialMenuLength = initialMenu.length;
      const res = await chai.request(app).post("/menu/1").send(validMenuItem);

      expect(res).to.have.status(201);
      expect(res.body)
        .to.have.property("message")
        .that.equals("Menu item added successfully");
      expect(res.body).to.have.property("menu").that.is.an("array");

      const updatedMenu = res.body.menu;
      expect(updatedMenu.length).to.equal(initialMenuLength + 1);

      for (let i = 0; i < initialMenuLength; i++) {
        expect(updatedMenu[i]).to.deep.equal(initialMenu[i]);
      }
      expect(updatedMenu[updatedMenu.length - 1]).to.deep.equal(validMenuItem);
    });
  });
});