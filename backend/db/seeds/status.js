/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("unit_x").del();
  await knex("unit_x").insert([
    {
      name: "Lt Jacob",
      status: "present",
    },
    {
      name: "Lt Thomas",
      status: "home",
    },
  ]);
};
