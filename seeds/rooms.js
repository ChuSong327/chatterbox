exports.seed = (knex, Promise) => {
    return knex("rooms").del()
        .then(() => {
            return knex("rooms").insert([{
                name: "JavaScript",
                usercount:10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Python",
                usercount: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Algorithm",
                usercount: 10,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Interview Prep",
                usercount:20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Career Coaching",
                usercount:20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Networking Event",
                usercount:20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Online Tutoring",
                usercount:20,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Questions",
                usercount:20,
                created_at: new Date(),
                updated_at: new Date()
            }
        ])
    })
} 