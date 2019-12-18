const app = require("../server/server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);



describe("# Server APIs", () => {
  it("Welcomes user to the api", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
       /*    console.warn('res', res); */
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });

/*   it("login 2 numbers", done => {
    chai
      .request(app)
      .post("/login")
      .send({ rut: '123322', password: 'test' })
      .end((err, res) => {
          console.log('response', res)
        expect(res).to.have.status(200);
     
        done();
      });
  }); */
});
