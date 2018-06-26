exports.seed = (knex, Promise) => {
    return knex("messages").del()
        .then(() => {
            return knex("messages").insert([{
                content: "JavaScript is so much fun!!",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 1,
                user_id: 1
            },
            {
                content: "I love Python!!",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 2,
                user_id:2
            },
            {
                content: "Algorithm is hard",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 3,
                user_id: 3
            },
            {
                content: "Is JavaScript important to learn?",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 1,
                user_id: 5
            },
            {
                content: "San Francisco Full-stack engineer meetup event on June 28th at 6:00PM. Free food and drinks!",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 6,
                user_id: 6
            },
            {
                content: "Algorithm competition this weekend, anyone wants to join?",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 3,
                user_id: 4
            },
            {
                content: "Mock interview practice tips?? Please share!!",
                created_at: new Date(),
                updated_at: new Date(),
                room_id: 4,
                user_id: 2
            }
        ])
    })
};