/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id"),
        tbl.string("recipe_name", 128).notNullable().unique(),
        tbl.timestamp("recipe_date").defaultTo(knex.fn.now());
    })
    .createTable("steps", (tbl) => {
      tbl.increments("step_id"),
        tbl.integer("step_sequence").unsigned().notNullable(),
        tbl.string("step_instruction").notNullable(),
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("recipe_id")
          .inTable("recipes");
    })
    .createTable("contents", (tbl) => {
      tbl.increments("contents_id"),
        tbl.string("contents_name").notNullable(),
        tbl.float("amount").notNullable();
    })
    .createTable("contents_steps", (tbl) => {
      tbl.increments("contents_steps_id"),
        tbl
          .integer("contents_id")
          .references("contents_id")
          .inTable("contents"),
        tbl.integer("step_id").references("step_id").inTable("steps");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("contents_steps")
    .dropTableIfExists("contents")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes");
};
