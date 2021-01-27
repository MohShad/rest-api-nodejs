exports.up = async (knex) => {
	return await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
		.createTable('users', async (table) => {
			// users table
			table.increments();
			table.string('name').notNullable();
			table.string('email').unique().notNullable();
			table.string('password').notNullable();
			table.string('cell_phone');
			// is_active is true, its mean user verified his email
			table.boolean('is_active').notNullable().defaultTo(true);
			table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
			table.timestamp('last_accessed_at');
			table.timestamp('updated_at');
		});
};

exports.down = async function (knex) {
	return await knex.schema.dropTable('users')
};

