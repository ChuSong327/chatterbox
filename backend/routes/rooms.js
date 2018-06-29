const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

//This router is mounted at http://localhost:3000/api/rooms
router.get("/", (req, res) => {
    knex("rooms").select().then((rooms) => {
        res.json(rooms);
    });
});

router.get("/:room_id", (req, res) => {
    const id = req.params.room_id;
    console.log(req.params)
    knex("messages").select().where("room_id", id).then((messages) => {
        res.json(messages);
    }).then();
});

module.exports = router;