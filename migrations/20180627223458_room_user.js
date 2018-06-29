exports.up = function(knex, Promise) {
  return knex.schema.createTable("room_user", (table) => {
      table.increments().primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("room_id").unsigned().references("id").inTable("rooms");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("room_user");
};
