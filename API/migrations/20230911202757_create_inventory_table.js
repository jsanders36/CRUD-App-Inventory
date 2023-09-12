/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventory_table', table => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('user_table.id');
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('inventory_table', table => {
    table.dropForeign('user_id')
    })
      .then(function () {
        return knex.schema.dropTableIfExists('inventory_table');
      });

};
