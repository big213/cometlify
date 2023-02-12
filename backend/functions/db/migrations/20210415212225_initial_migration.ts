import * as Knex from "knex";

export async function up(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.createTable("user", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("firebase_uid").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("avatar").nullable();
      table.text("description").nullable();
      table.integer("role").notNullable().defaultTo(2);
      table.jsonb("permissions").nullable();
      table.boolean("is_public").notNullable().defaultTo(true);
      table.boolean("allow_email_notifications").notNullable().defaultTo(true);
      table.string("comet_api_key").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("apiKey", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("code").notNullable().unique();
      table.string("user").notNullable();
      table.jsonb("permissions").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("file", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.integer("size").notNullable();
      table.string("location").notNullable();
      table.string("content_type").notNullable();
      table.string("parent_key").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("collection", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("avatar").nullable();
      table.text("description").nullable();
      table.string("symbol").notNullable();
      table.boolean("is_numbered").notNullable().defaultTo(true);
      table.decimal("price").nullable();
      table.integer("max_supply").nullable();
      table.string("collection_id").nullable();
      table.boolean("is_deployed").notNullable().defaultTo(false);
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("userUserFollowLink", function (table) {
      table.string("id").notNullable().primary();
      table.string("user").notNullable();
      table.string("target").notNullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
      table.unique(["user", "target"]);
    }),
  ]);
}

export async function down(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.dropTable("user"),
    knex.schema.dropTable("apiKey"),
    knex.schema.dropTable("file"),
    knex.schema.dropTable("collection"),
    knex.schema.dropTable("userUserFollowLink"),
  ]);
}
