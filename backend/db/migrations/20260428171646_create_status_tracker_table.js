/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("unit_x", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.boolean("here");
    table
      .enu("location", [
        "Set Location",
        "Weekend",
        "Home",
        "Appointment",
        "Leave",
        "Lunch",
        "Other",
      ])
      .defaultTo(null);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("unit_x");
};
