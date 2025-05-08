const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../index");
const should = chai.should();

chai.use(chaiHttp);

describe("Sample Test Cases", () => {
  // Passing test case
  it("should return 200 for the root endpoint", (done) => {
    chai
      .request(app)
      .get("/") 
      .end((err, res) => {
        res.should.have.status(200); 
        done();
      });
  });

  // Failing test case
  it("should return 200 for a non-existent endpoint", (done) => {
    chai
      .request(app)
      .get("/non-existent-endpoint")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
