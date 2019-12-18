'use strict';

const express = require('express');
const auth = require('./auth');

const router = express.Router(), free = express.Router();
router.use(auth);

const { checkSchema } = require('express-validator/check');

const { WellcomeController, AuthController,TaskController } = require('../app/controllers');
const { AuthValidation, RegisterValidation,TaskValidation } = require('../app/validations');

module.exports = (app) => {
    console.log('Routes');
    free.get('/', WellcomeController.index);
    free.post('/login', checkSchema(AuthValidation), AuthController.login);
    free.post('/register', checkSchema(RegisterValidation), AuthController.register);
    router.delete('/logout', AuthController.logout);
    router.get('/tasks', TaskController.index);
    router.post('/tasks', checkSchema(TaskValidation), TaskController.create);
    router.delete('/tasks/:id', TaskController.delete);

    app.use('', free);
    app.use('', router);
    console.log('END ROUTES');

};
