MIGRATION
Create migration file
knex migrate:make migration_name

Create tables
knex migrate:up

Drop tables
knex migrate:down

Executar últimas alterações no arquivo migrate
Execute last update in migrate file
knex migrate:latest --env development
--------------------------------------------------
SEED
knex seed:make seed_name

knex seed:run --specific=seed_role.js

knex seed:run --env development