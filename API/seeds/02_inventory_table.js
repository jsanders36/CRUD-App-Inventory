/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE inventory_table CASCADE')
  await knex('inventory_table').del()
  await knex('inventory_table').insert([
    { id: 1, user_id: 1, item_name: 'Wrench', description: 'This wrench is made for the man or woman with sensitive hands, but always needs to fix things behind their kids and furry animals.', quantity: 5 },
    { id: 2, user_id: 1, item_name: 'Hammer', description: 'This hammer has the special ability to fix any and all fence posts that may or may not be ripped down by that person\'s dogs.', quantity: 6 },
    { id: 3, user_id: 2, item_name: 'Shovel', description: 'This shovel is especially for any being who love to dig holes in their backyard and decrease the home value.', quantity: 7 },
    { id: 4, user_id: 3, item_name: 'Spoon', description: 'This spoon is for humans and dogs alike. Especially dogs who love to eat.', quantity: 7 },
  ]);
};
