const faker = require("faker");
const BUILD_ROOM_NUM = 30;
const BUILD_USER_NUM = 100;
const BUILD_MESSAGE_NUM = 500;
const BUILD_ROOM_USER_NUM = 500;
const BUILD_USER_FRIEND_NUM = 500;

const { format } = require("react-phone-input-auto-format");

const roomImages = [
    "https://res.cloudinary.com/chu327/image/upload/v1531198651/royal-huahine-deep-overwater-bungalows_96679_mcpqga.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200475/image4_nlruc0.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200475/image9_odsvsw.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200473/image6_c2y17a.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200473/images0_ss8oze.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200473/image1_vkscr8.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200472/image8_cgsmav.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200472/image3_h1of57.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200472/image2_mjahsb.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200472/image5_yzftql.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531200471/iamge7_z2hyv5.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531198651/royal-huahine-deep-overwater-bungalows_96679_mcpqga.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531617274/ChatterBox-UserProfilePics/p2.jpg"
];

const profilePics = [
    "https://res.cloudinary.com/chu327/image/upload/v1531207587/ChatterBox-UserProfilePics/S1.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207587/ChatterBox-UserProfilePics/S2.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207586/ChatterBox-UserProfilePics/S3.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207587/ChatterBox-UserProfilePics/S4.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207586/ChatterBox-UserProfilePics/S5.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207973/ChatterBox-UserProfilePics/S6.png",
    "https://res.cloudinary.com/chu327/image/upload/v1531207973/ChatterBox-UserProfilePics/S7.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531207973/ChatterBox-UserProfilePics/S8.gif",
    "https://res.cloudinary.com/chu327/image/upload/v1531617140/ChatterBox-UserProfilePics/i1.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531617139/ChatterBox-UserProfilePics/I2.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531617140/ChatterBox-UserProfilePics/i3.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531617140/ChatterBox-UserProfilePics/i5.jpg",
    "https://res.cloudinary.com/chu327/image/upload/v1531617140/ChatterBox-UserProfilePics/i6.jpg"
];


const buildRoomSeed = knex => {
    let res = [];
    for (let i = 0; i <= BUILD_ROOM_NUM; i++) {
        res.push(
            knex("rooms").insert({
                name: faker.address.country(),
                created_at: new Date(),
                updated_at: new Date(),
                imageUrl: roomImages[Math.floor(Math.random() * 12)] 
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
                profile: profilePics[Math.floor(Math.random() * 13)],
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
            knex("room_messages").insert({
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
        return knex("room_messages").del().then(() => {
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