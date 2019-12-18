
'use strict';

const { Task } = require('./../models');

class TaskService {
    /**
     * @description all
     * @return tasks || null
     */

    static async all(user) {
            return await Task.forge().orderBy('created_at', 'DESC').where('user_id', user.get('id')).fetchAll({
                withRelated: ['user']
            });
    }

    /**
     * @description delete
     * @return task || null
     */
    static async delete(id) {
        const task = await Task.where({ id: id }).fetch({
            withRelated: ['user']
        });
        if (task){
            await task.destroy();
        }
        return task;
    }

    /**
     * @description store
     * @return task || null
     */
    static async store({ text, user_id }) {
        // Save with no arguments
        try {
            let task = await Task.forge({
            text:text,
            user_id: user_id}).save();

            task = await Task.where({ id: task.id }).fetch({
                withRelated: ['user']
            });
            return {
                data: {
                    id: task.id,
                    text:task.get('text'),
                    user_id: task.get('user_id'),
                    created_at: task.get('created_at')
                }
            };
        } catch (e) {
            console.error('error', e)
        }
    }
}

module.exports = TaskService;