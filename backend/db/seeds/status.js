/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("unit_x").del();
  await knex("unit_x").insert([
    {
      name: "Lt Jacob",
      here: true,
      location: null,
    },
    {
      name: "Lt Thomas",
      here: false,
      location: "Home",
    },

    {
      name: "Sgt Hamilton",
      here: false,
      location: "Lunch",
    },
  ]);
};
