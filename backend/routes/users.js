const express = require("express");
const cors = require("cors");
const knex = require("../../db/knex");

let router = express.Router();

const corsOptions = {
    origin: "https://chattersquare.herokuapp.com",
    optionSuccessStatus: 200
  };


router.options("/", cors(corsOptions));
router.get('/', cors(corsOptions), (req, res) => {
    knex("users").select().then((users) => {
        res.json(users);
    });
});

//sign in
router.options("/signin", cors(corsOptions));
router.post("/signin", cors(corsOptions), (req, res) => {
    knex("users")
    .select()
    .where("username", req.body.username)
    .then((user) => {
        res.json(user);
    });
});

//sign up
router.options("/signup", cors(corsOptions));
router.post("/signup",cors(corsOptions), (req, res) => {
    knex("users").insert(req.body)
    .then(() => {
        knex("users").select().where("username", req.body.username).then((user) => {
            res.json(user);
        })
    });
});

//retrieve user's info
router.options("/retrieveuser/:user_id", cors(corsOptions));
router.get("/retrieveuser/:user_id", cors(corsOptions), (req, res) => {
    const id = req.params.user_id;
    knex("users").select().where("id", id).then(user => {
        res.json(user);
    })
});

//update user's information
router.options("/updateuserinfo", cors(corsOptions));
router.post("/updateuserinfo", cors(corsOptions), (req, res) => {
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
            res.json(user);
        })
    })
    .catch(error => {
        console.log("This is an error: ", error);
    })
});

//get user's friends list
router.options("/getfriends/:user_id", cors(corsOptions));
router.get("/getfriends/:user_id", cors(corsOptions), (req, res) => {
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
        res.json(userFriends);
    })
});

//delete friends
router.options("/deletefriends", cors(corsOptions));
router.post("/deletefriends",cors(corsOptions), (req, res) => {
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
            res.json(userFriends);
        })
    })
});

//add friends
router.options("/addfriends", cors(corsOptions));
router.post("/addfriends", cors(corsOptions), (req, res) => {
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
            res.json(userFriends);
        })
    })
})

//get user's rooms
router.options("/getrooms/:user_id", cors(corsOptions));
router.get("/getrooms/:user_id",cors(corsOptions),  (req, res) => {
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
        res.json(userRooms);
    })
});

//join a new chatroom
router.options("/joinroom", cors(corsOptions));
router.post("/joinroom", cors(corsOptions),(req, res) => {
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
        res.json(userRooms);
    })
});

//remove a chatroom
router.options("/removeroom", cors(corsOptions));
router.post("/removeroom", cors(corsOptions), (req, res) => {
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
            res.json(userRooms);
        })
    })
});

module.exports = router;