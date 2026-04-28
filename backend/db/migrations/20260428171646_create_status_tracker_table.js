/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("unit_x", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table
      .enu("status", [
        "present",
        "home",
        "appointment",
        "leave",
        "lunch",
        "other",
      ])
      .defaultTo("present")
      .notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("unit_x");
};
