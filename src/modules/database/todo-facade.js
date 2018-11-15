const todoDB = require('../database/todo-db');

const Todo = {

    async listAll(res) {
        try {
            const { rows, rowCount } = await todoDB.listAll();
            const json = {
                rows: rows,
                rowCount: rowCount
            }
            res.send(json);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async list(res, id) {
        try {
            const { rows } = await todoDB.list(id);
            res.send(rows[0]);
        } catch (err) {
            res.status(400).send(err);
        }
    }

}

module.exports = Todo;