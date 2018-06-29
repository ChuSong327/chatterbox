exports.up = function(knex, Promise) {
  return knex.schema.createTable("room_user", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("rooms");
      table.integer("room_id").unsigned().references("id").inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("room_user");
};
