const knex = require('../db-knex/knex-connection');

const bookShelf = require('bookshelf');
const bookShelfDatabase = bookShelf(knex);
const securePassword = require('bookshelf-secure-password');
bookShelfDatabase.plugin(securePassword);

const User = bookShelfDatabase.Model.extend({
    tableName: 'users',
});

module.exports = User;
