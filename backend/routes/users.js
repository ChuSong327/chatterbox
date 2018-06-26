const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get('/', (req, res) => {
    knex("users").select().then((users) => {
        res.json(users);
    });
});

module.exports = router;