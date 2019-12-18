'use strict';

const { TaskService } = require('./../services');
const {validationResult} = require('express-validator/check');

class TasksController {

    /**
     * @description index
     * @return task[]
     */
    static async index(req, res) {
        return res.status(200).json({
            data: await TaskService.all(req.user)
        });
    }

    /**
     * @description destroy
     * @return task
     */
    static async delete(req, res) {
        const id = req.params.id;
        const data = await TaskService.delete(id);
        return res.status(204).json({ data: data});
    }

    /**
     * @description store
     * @return task
     */
    static async create(req, res) {
        const errors = validationResult(req).formatWith(({ msg }) => {
            return msg;
        });
        if (errors.isEmpty()) {
            const values = req.body;
            const user = req.user;
            values.user_id = user.id;
            const data = await TaskService.store(values);
            if (data) {
                return res.status(200).json(data);
            }
            return res.status(422).json({
                message: 'Esta tarea ya fue registrada',
                duplicate: true
            });
        }
        return res.status(422).json({ errors: errors.mapped() });
    }
}

module.exports = TasksController;
