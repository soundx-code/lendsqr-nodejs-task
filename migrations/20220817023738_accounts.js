/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("accounts", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        table.string("account_number").notNullable();
        table.string("account_pin").defaultTo(null);
        table.decimal("account_balance").defaultTo(0);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable("accounts");
};
