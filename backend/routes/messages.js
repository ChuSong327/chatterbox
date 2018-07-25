const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get("/", (req, res) => {
    knex("messages").select().then((messages) => {
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
        });
        res.json(messages);
    })
});

module.exports = router;