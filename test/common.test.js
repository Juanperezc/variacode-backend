
const knex = require('knex')({ debug: false, client: 'pg' });


const express = require("../server/server");
const { User } = require('./../app/models');
const bcrypt = require('bcryptjs');
 const request = require("supertest")(express);
 const chai = require("chai");
 const should = chai.should();

const defaultUser = {
 rut: "1234567890",
 password: "test",
 name: "test",
 last_name: "test"};

const createUser = async () => {
    const user = await User.forge({
        rut: defaultUser.rut,
        password: await bcrypt.hash(defaultUser.password,10),
        name: defaultUser.name,
        last_name: defaultUser.last_name}).save();
};

const getDefaultUser = async () => {

    let user = await User.where('rut', defaultUser.rut).fetch();
    if (!user) {
        await createUser();
        return getDefaultUser();
    } else { 
        return user;
    } 
};
 const loginWithDefaultUser = async () => {
    return request.post("/login")
        .send({ "rut": defaultUser.rut, "password": defaultUser.password })
        .expect(200);
};

 const cleanExceptDefaultUser = async () => {
    let user = await getDefaultUser();
   
    /* const users = await User.where('rut', '<>', defaultUser.rut) */

    const users =  await User.where(knex.raw('rut <> ?', defaultUser.rut)).
    count();
    if (users > 0){
        await User.where(knex.raw('rut <> ?', defaultUser.rut)).
        destroy();
    }
};

module.exports = {
    request:  request,
    chai: chai,
    should: should,
    loginWithDefaultUser : loginWithDefaultUser,
    cleanExceptDefaultUser: cleanExceptDefaultUser
}