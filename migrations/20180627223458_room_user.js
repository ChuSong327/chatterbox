exports.up = function(knex, Promise) {
  return knex.schema.createTable("room_user", (table) => {
      table.increments();
      table.integer("user_id").notNullable();
      table.integer("room_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("room_user");
};
