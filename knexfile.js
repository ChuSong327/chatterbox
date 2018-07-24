// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection:  "postgres://localhost/chatterbox"
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
