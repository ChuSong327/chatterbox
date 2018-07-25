const express = require("express");
const knex = require("../../db/knex");

let router = express.Router();

router.get('/', (req, res) => {
    knex("users").select().then((users) => {
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS "
        });
        res.json(users);
    });
});

//sign in
router.post('/signin', (req, res) => {
    console.log("this is the request: ", req)
    knex("users")
    .select()
    .where("username", req.body.usernameEmail)
    .orWhere("email", req.body.usernameEmail)
    .then((user) => {
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS "
        });
        res.json(user);
    });
});

//sign up
router.post("/signup", (req, res) => {
    knex("users").insert(req.body)
    .then(() => {
        knex("users").select().where("username", req.body.username).then((user) => {
            res.set({
                "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
            });
            res.json(user);
        })
    });
});

//retrieve user's info
router.get("/retrieveuser/:user_id", (req, res) => {
    const id = req.params.user_id;
    knex("users").select().where("id", id).then(user => {
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
        });
        res.json(user);
    })
});

//update user's information
router.post("/updateuserinfo", (req, res) => {
    const { 
        id, 
        username, 
        firstname, 
        lastname, 
        email, 
        phone, 
        password, 
        profile, 
        updated_at
    } = req.body;
    knex("users").select().where("id", id).update({
        id: id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        profile: profile,
        updated_at: updated_at
    })
    .then(() => {
        knex("users").select().where("id", id).then(user => {
            res.set({
                "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
            });
            res.json(user);
        })
    })
    .catch(error => {
        console.log("This is an error: ", error);
    })
});

//get user's friends list
router.get("/getfriends/:user_id", (req, res) => {
    const id = req.params.user_id;
    const userFriends = [];
    knex("user_friend").select().where("user_id", id).then((friends) => {
        return Promise.all(
            friends.map(friend => {
                const friend_id = friend.friend_id;
                return knex("users").select().where("id", friend_id).then((user_friend) => {
                    userFriends.push(...user_friend);
                });
            })
        )
    }).then(() => {
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
        });
        res.json(userFriends);
    })
});

//delete friends
router.post("/deletefriends", (req, res) => {
    const { user_id, friend_id } = req.body;
    const userFriends = [];
    knex("user_friend")
    .select()
    .where({ 
        "user_id": user_id, 
        "friend_id": friend_id 
    })
    .del()
    .then(() => {
        knex("user_friend").select().where("user_id", user_id).then((friends) => {
            return Promise.all(
                friends.map(friend => {
                    const friend_id = friend.friend_id;
                    return knex("users").select().where("id", friend_id).then((user_friend) => {
                        userFriends.push(...user_friend);
                    });
                })
            )
        }).then(() => {
            res.set({
                "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
            });
            res.json(userFriends);
        })
    })
});

//add friends
router.post("/addfriends", (req, res) => {
    const { friend_id, user_id } = req.body;
    const userFriends = [];
    knex("user_friend")
    .insert(req.body)
    .then(() => {
        knex("user_friend").select().where("user_id", user_id).then(friends => {
            return Promise.all(
                friends.map(friend => {
                    const friend_id = friend.friend_id;
                    return knex("users").select().where("id", friend_id).then(user_friend => {
                        userFriends.push(...user_friend);
                    });
                })
            )   
        }).then(() => {
            res.set({
                "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
            });
            res.json(userFriends);
        })
    })
})

//get user's rooms
router.get("/getrooms/:user_id", (req, res) => {
    const id = req.params.user_id;
    let userRooms = [];
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
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
        });
        res.json(userRooms);
    })
});

//join a new chatroom
router.post("/joinroom", (req, res) => {
    const { user_id } = req.body;
    let userRooms = [];
    knex("room_user")
    .insert(req.body)
    .then(() => {
        knex("room_user").select().where("user_id", user_id).then(rooms => {
            return Promise.all(
                rooms.map(room => {
                    const room_id = room.room_id;
                    return knex("rooms").select().where("id", room_id).then((user_room) => {
                        userRooms.push(...user_room);
                    });
                })
            )
        })
    }).then(() => {
        res.set({
            "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
        });
        res.json(userRooms);
    })
});

//remove a chatroom
router.post("/removeroom", (req, res) => {
    const { user_id, room_id } = req.body;
    const userRooms = [];
    knex("room_user")
    .select()
    .where({
        "user_id": user_id,
        "room_id": room_id
    })
    .del()
    .then(() => {
        knex("room_user").select().where("user_id", user_id).then(rooms => {
            return Promise.all(
                rooms.map(room => {
                    const room_id = room.room_id;
                    return knex("rooms").select().where("id", room_id).then(user_room => {
                        userRooms.push(...user_room);
                    })
                })
            );
        }).then(() => {
            res.set({
                "Access-Control-Allow-Origin": "https://chattersquare.herokuapp.com/",
                "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE "
            });
            res.json(userRooms);
        })
    })
});

module.exports = router;