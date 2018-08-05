const express = require("express");
const cors = require("cors");
const knex = require("../../db/knex");

let router = express.Router();

// const corsOptions = {
//     origin: "https://chattersquare.herokuapp.com",
//     optionSuccessStatus: 200
// };

// router.options("/", cors(corsOptions));
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