exports.up = function(knex, Promise) {
  return knex.schema.createTable("rooms", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("imageUrl");
      table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("rooms");
};
