exports.seed = function (knex) {
	return knex("users")
		.del()
		.then(function () {
		});
};

