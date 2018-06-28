exports.seed = function(knex, Promise) {
  return knex("room_user").del()
    .then(function () {
      return knex("room_user").insert([{
        user_id: 1,
        room_id: 3
      },
    {
      user_id: 2,
      room_id: 1 
    },
    {
      user_id: 3,
      room_id: 2
    },
    {
      user_id: 4,
      room_id: 3
    },
    {
      user_id: 5,
      room_id: 4
    },
    {
      user_id: 6,
      room_id: 5
    },
    {
      user_id: 7,
      room_id: 6
    },
    {
      user_id: 1,
      room_id: 8
    },
    {
      user_id: 2,
      room_id: 2
    },
    {
      user_id: 3,
      room_id: 3
    },
    {
      user_id: 4,
      room_id: 5
    },
    {
      user_id: 5,
      room_id: 8
    },
    {
      user_id: 6,
      room_id: 1
    }]);
  });
};
