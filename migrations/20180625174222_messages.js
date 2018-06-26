exports.up = (knex, Promise) => {
  return knex.schema.createTable("messages", (table) => {
      table.increments();
      table.text("content").notNullable();
      table.timestamps();
      table.integer("room_id").notNullable();
      table.integer("user_id").notNullable();
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("messages")
};
