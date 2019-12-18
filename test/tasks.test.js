
const { request, loginWithDefaultUser,chai  } = require('./common.test');
const should = require('should');

describe("# Tasks APIs", () => {
    const newTask = { 
        text: 'Test',
        status: 'C',
        /* submitDate: new Date() */}
    let token;
    let last_id;
    before(async ()=> {
        //get token
        let resToken =  await loginWithDefaultUser();
       /*  console.warn('token', resToken.body); */
        token = resToken.body.token;
    })
    it("should save the project", () => {
        /* console.warn('token' ,token); */
            return request.post("/tasks")
                .set("Authorization", 'Bearer ' + token)
                .send(newTask)
                .expect(200)
                .expect(res => {
                  /*   console.log('res.body', res.body) */
                    should(res.body).have.property('data');
                    should(res.body.data).have.property('text');
                    should(res.body.data).have.property('user_id');
                    should(res.body.data).have.property('created_at');
                    last_id =  res.body.data.id;
                })
    });
 
    it("should get list of tasks", () => {
        return request.get("/tasks")
        .set("Authorization", 'Bearer ' + token)
        .expect(200)
        .expect(res => {
            should(res.body.data).be.instanceof(Array)

            should(res.body.data[0]).have.property('id')
            should(res.body.data[0]).have.property('text');
            should(res.body.data[0]).have.property('user_id');
            should(res.body.data[0]).have.property('created_at');
        });
    });

    it("should delete tasks", () => {
        return request.delete("/tasks/" + last_id)
        .set("Authorization", 'Bearer ' + token)
        .expect(204)
    });
      it("should return 403 with invalid or expired token", () => {
        return request.post("/tasks")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjcwMWQyNGQ2ZjIyYTJiZThiYjg1MzYiLCJ1c2VybmFtZSI6InRlc3RAdGVjaGJyaWouY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTEJNQy5tQVFxWWNmLjVZSlRlSVNlT1cvUVp1NWJ5WVN4anJmSGFQUTJZZVlkWXR6Y25lbFMiLCJfX3YiOjAsImlhdCI6MTUzNDQzODk0MywiZXhwIjoxNTM0NDM5MDYzfQ.zFMsJiny3At6vJRsjl8AzKnjlTMGVc1fdZnH2kwu6dQ")
            .send(newTask)
            .expect(res => {
               /*  console.log('response', res.body) */
                res.body.message.should.equal("Missing Authorization token in headers")
            })
            .expect(403);
    });
});