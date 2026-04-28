/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("favs").del();
  await knex("favs").insert([
    {
      name: "F1 Movie",
    },
    {
      name: "The Running Man",
    },
  ]);
};
