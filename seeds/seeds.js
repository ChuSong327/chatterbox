exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        username: "2dogs",
        email: "2dogs@gmail.com",
        password: "iam2dogs",
        fullname: "TwoDogs",
        phone: "(880) 880-8888",
        updated_at: new Date(),
        created_at: new Date()
      }]);
    });
};
