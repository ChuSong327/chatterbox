const faker = require("faker");
const BUILD_ROOM_NUM = 10;
const BUILD_USER_NUM = 50;
const BUILD_MESSAGE_NUM = 100;
const BUILD_ROOM_USER_NUM = 50;
const BUILD_USER_FRIEND_NUM = 100;

const { format } = require("react-phone-input-auto-format");

const buildRoomSeed = knex => {
    let res = [];
    for (let i = 0; i <= BUILD_ROOM_NUM; i++) {
        res.push(
            knex("rooms").insert({
                name: faker.address.country(),
                created_at: new Date(),
                updated_at: new Date()
            })
        );
    }
    return res;
};

const buildUserSeed = knex => {
    let res = [];
    for (let i = 0; i < BUILD_USER_NUM; i++) {
        res.push(
            knex("users").insert({
                username: `user${i}`,
                email: `user${i}@gmail.com`,
                password: faker.random.number(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                phone: format(faker.phone.phoneNumberFormat()),
                updated_at: new Date(),
                created_at: new Date()
            })
        );
    }
    return res;
};

const buildMessageSeed = knex => {
    let res = [];
    for (let i = 0; i < BUILD_MESSAGE_NUM; i++) {
        res.push(
            knex("messages").insert({
                content: faker.lorem.paragraph(),
                room_id: Math.floor(Math.random() * BUILD_ROOM_NUM + 1),
                user_id: Math.floor(Math.random() * BUILD_USER_NUM + 1),
                created_at: new Date(),
                updated_at: new Date()
            })
        );
    }
    return res;
};

const buildRoomUserSeed = knex => {
    let res = [];
    for (let i = 0; i < BUILD_ROOM_USER_NUM; i++) {
        res.push(
            knex("room_user").insert({
                user_id: Math.floor(Math.random() * BUILD_USER_NUM + 1),
                room_id: Math.floor(Math.random() * BUILD_ROOM_NUM + 1)
            })
        );
    }
    return res;
};

const buildUserFriendSeed = knex => {
    let res = [];
    for (let i = 0; i < BUILD_USER_FRIEND_NUM; i++) {
        res.push(
            knex("user_friend").insert({
                user_id: Math.floor(Math.random() * BUILD_USER_NUM + 1),
                friend_id: Math.floor(Math.random() * BUILD_USER_NUM + 1)
            })
        );
    }
    return res;
};

exports.seed = (knex, Promise)  => {
    return knex("rooms").del().then(() => {
        return Promise.all(buildRoomSeed(knex));
    })
    .then(() => {
        return knex("users").del().then(() => {
            return Promise.all(buildUserSeed(knex));
        });
    })
    .then(() => {
        return knex("messages").del().then(() => {
            return Promise.all(buildMessageSeed(knex));
        });
    })
    .then(() => {
        return knex("room_user").del().then(() => {
            return Promise.all(buildRoomUserSeed(knex));
        });
    })
    .then(() => {
        return knex("user_friend").del().then(() => {
            return Promise.all(buildUserFriendSeed(knex));
        })
    })
};