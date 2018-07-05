const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get('/', (req, res) => {
    knex("users").select().then((users) => {
        res.json(users);
    });
});

//sign in
router.post('/signin', (req, res) => {
    knex("users").select().where("username", req.body.usernameEmail).orWhere("email", req.body.usernameEmail).then((user) => {
        res.json(user);
    });
});

//sign up
router.post("/signup", (req, res) => {
    knex("users").insert(req.body)
    .then(() => {
        knex("users").select().where("username", req.body.username).then((user) => {
            res.json(user);
        })
    });
});

module.exports = router;