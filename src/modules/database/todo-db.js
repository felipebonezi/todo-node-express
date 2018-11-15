const db = require('../database/psql');

const listAll = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM todos;`)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            console.log('Error: ', err);
            reject(err);
        });
    });
}

const list = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM todos WHERE id = ${id};`)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

const end = () => {
    db.end();
}

module.exports = {
    end,
    listAll,
    list
};