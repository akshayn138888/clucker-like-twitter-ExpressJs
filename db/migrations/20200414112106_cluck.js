exports.up = function(knex) {
  return knex.schema.createTable("Clucks", table => {
    table.increments("id");
    table.string("username");
    table.text("image_url");
    table.text("content");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Clucks");
};
