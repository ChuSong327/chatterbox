dropdb chatterbox;
createdb chatterbox;
knex migrate:latest;
knex seed:run; 