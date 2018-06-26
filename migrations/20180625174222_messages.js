exports.up = function(knex, Promise) {
  return knex.schema.createTable("messages", (table) => {
      table.increments();
      table.text("content").notNullable();
      table.timestamps();
      table.integer("home_id").notNullable();
      table.integer("user_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("messages")
};
