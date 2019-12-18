const { request, loginWithDefaultUser, cleanExceptDefaultUser  } = require('./common.test');
const should = require('should');

describe("# Auth APIs", () => {
    const newUser = { 
        rut: "987654321", 
        password: "test",
        name: "test",
        last_name: "test"};
      it("should create user", () => {
        return cleanExceptDefaultUser().then(() => {
            return request.post('/register')
                .send(newUser)
                .expect(200)
                .then(res => {
                 /*    console.log('res body', res.body) */
                /*     res.body.success.should.be.true; */
                });
        });
    });
 
    it("should retrieve the token", () => {
        return cleanExceptDefaultUser().then(res => {
            return loginWithDefaultUser().then(res => {
               /*  console.log('res', res); */
                should(res.body).have.property('token');
                should(res.body).have.property('type');
                should(res.body).have.property('data');
            });
        });
    });
 
    it("should not login with the right user but wrong password", () => {
        return request.post('/login')
            .send({ "rut": newUser.rut, "password": "random" })
            .expect(422).then(res => {
                 should(res.body).have.property('message');
             });;
    });
});