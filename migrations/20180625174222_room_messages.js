exports.up = (knex, Promise) => {
  return knex.schema.createTable("room_messages", (table) => {
      table.increments("id").primary();
      table.text("content").notNullable();
      table.timestamps();
      table.integer("room_id").unsigned().references("id").inTable("rooms");
      table.integer("user_id").unsigned().references("id").inTable("users");
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("messages")
};
