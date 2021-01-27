const databaseName = 'authentication_jwt';

module.exports = {

	development: {
		client: 'pg',
		connection: {
			database: databaseName,
			user: 'postgres',
			password: 'root'
		},
		migrations: {
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds'
		},
		pool: {
			min: 2,
			max: 10
		},
	}
}