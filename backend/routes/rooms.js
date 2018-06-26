const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get("/", (req, res) => {
    knex("rooms").select().then((rooms) => {
        res.json(rooms);
    })
})

module.exports = router;