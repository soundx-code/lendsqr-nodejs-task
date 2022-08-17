/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("payments", (table) => {
        table.increments("id").primary();
        table.integer("sender_id").notNullable();
        table.integer("receiver_id").notNullable();
        table.string("reference").notNullable();
        table.decimal("amount").notNullable();
        table.string("status").notNullable();
        table.timestamps(true, true)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable("payments");
};
