const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

//This router is mounted at http://localhost:3000/api/rooms
router.get("/", (req, res) => {
    knex("rooms").select().then((rooms) => {
        res.json(rooms);
    });
});

// router.get("/:room_id", (req, res) => {
//     const id = req.params.room_id;
//     knex("messages").select().where("room_id", id).then((messages) => {
//         res.json(messages);
//     }).then();
// });

//get current chatroom
router.get("/getcurrentroom/:room_id", (req, res) => {
    const { room_id } = req.params;
    knex("rooms").select().where("id", room_id).then((room) => {
        res.json(room);
    })
});

//get current room's messages and each message's user
router.get("/getroommessages/:room_id", (req, res) => {
    const { room_id } = req.params;
    let response = [];
    knex("room_messages").select().where("room_id", room_id).then((messages) => {
        return Promise.all(
            messages.map(message => {
                const { user_id } = message;
                return knex("users").select().where("id", user_id).then(user => {
                    response.push({content: message, user: user});
                })
            })
        )
    }).then(() => {
        res.json(response);
    })
})
module.exports = router;