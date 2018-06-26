exports.up = function(knex, Promise) {
  return knex.schema.createTable("rooms", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("usercount");
      table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("rooms");
};
