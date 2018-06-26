const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get("/", (req, res) => {
    knex("messages").select().then((messages) => {
        res.json(messages);
    })
});

module.exports = router;