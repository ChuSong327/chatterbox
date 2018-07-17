const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

//This router is mounted at http://localhost:3000/api/rooms
router.get("/", (req, res) => {
    knex("rooms").select().then((rooms) => {
        res.json(rooms);
    });
});

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
});

//post user's messages in current room
router.post("/postroommessages", (req, res) => {
    const { room_id, content, created_at } = req.body;
    let response = [];
    knex("room_messages").insert(req.body).then(() => {
        knex("room_messages").select().where("room_id", room_id).then((messages) => {
            return Promise.all(
                messages.map(message => {
                    const { user_id } = message;
                    return knex("users").select().where("id", user_id).then(user => {
                        response.push({content: message, user: user});
                    });
                })
            );
        }).then(() => {
            response.map(response => {
            })
            res.json(response);
        })
    })
});

router.get("/getroomusers/:room_id", (req, res) => {
    const { room_id } = req.params;
    let response = [];
    knex("room_user").select().where("room_id", room_id).then(users => {
        return Promise.all(
            users.map(user => {
                const { user_id } = user;
                return knex("users").select().where("id", user_id).then(users => {
                    response.push(...users);
                })
            })
        )
    }).then(() => {
        res.json(response);
    })
});
        
//get all rooms
router.get("/getallrooms", (req, res) => {
   knex("rooms").select("*").then(rooms => {
       res.json(rooms);
   })
});

module.exports = router;