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

//get user's rooms
router.get("/getrooms/:user_id", (req, res) => {
    const id = req.params.user_id;
    const userRooms = [];
    knex("room_user").select().where("user_id", id).then((rooms) => {
       return Promise.all(
            rooms.map(room => {
                const room_id = room.room_id;
                return knex("rooms").select().where("id", room_id).then((user_room) => {
                    userRooms.push(...user_room);
                });
            })        
        )
    }).then(() => {
        res.json(userRooms);
    })
});

//get user's friends list
router.get("/getfriends/:user_id", (req, res) => {
    const id = req.params.user_id;
    const userFriends = [];
    knex("user_friend").select().where("user_id", id).then((friends) => {
        console.log("this is the friends:", friends);
        return Promise.all(
            friends.map(friend => {
                const friend_id = friend.friend_id;
                return knex("users").select().where("id", friend_id).then((user_friend) => {
                    userFriends.push(...user_friend);
                });
            })
        )
    }).then(() => {
        res.json(userFriends);
    })
});

module.exports = router;