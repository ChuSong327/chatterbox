exports.up = function(knex, Promise) {
    return knex.schema.createTable("user_friend", (table) => {
        table.increments().primary();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.integer("friend_id").unsigned().references("id").inTable("users");
    });
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable("user_friend");
};