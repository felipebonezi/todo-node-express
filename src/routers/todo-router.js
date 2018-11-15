const jwt = require('express-jwt');
const guard = require('express-jwt-permissions')();
const express = require('express');
const router = express.Router();

const todoFacade = require('../modules/database/todo-facade');

function hasError(err, res) {
    if (!err) { return false; }

    console.log('Error: ', err);
    console.log(`Status: ${err.status}`);
    switch (err.status) {
        case 403:
            console.log(`Message: ${err.inner.message}`);
            break;

        case 401:
        default:
            console.log(`Message: ${err.inner.message}`);
            break;
    }
    unauthorized(res, err.status, err.inner.message);
    return true;
}

function unauthorized(res, code, message) {
    res.status(code || 401)
        .send({ code: code || 401, message: message || "You're not authorized!" })
        .end();
}

// Middleware that is specific to this router.
const jwtConfig = {
    secret: new Buffer('09876543211234567890', 'base64'),
    getToken: function fromHeaderOrQueryString(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.authorization) {
          return req.query.authorization;
        }
        return null;
    }
};
router.use(jwt(jwtConfig), (err, req, res, next) => {
        console.log(`New request is comming: ${Date.now()}`);
        if (hasError(err, res)) { return; }

        console.log('User: ', req.user);
        next();
    }).use(guard.check('crud'), 
        (err, req, res, next) => {
            if (hasError(err, res)) { return; }
            next();
    }).get('/list', (req, res) => {
        todoFacade.listAll(res);
    })
    .route('/:id')
    .get((req, res) => {
        todoFacade.list(res, req.params.id);
    })
    .post((req, res) => {
        
    })
    .put((req, res) => {
        res.send('TODO put!');
    })
    .delete((req, res) => {
        res.send('TODO delete!');
    });

module.exports = router;