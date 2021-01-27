'use strict'

const bcrypt = require('bcrypt');
const User = require('../../model/user');
const log = require('../../libs/log');
const knex = require('../../db-knex/knex-connection');
const moment = require('moment');

module.exports.createUser = async (userData) => {

    try {

        const user = new User({
            name: userData.name,
            email: userData.email,
            password: await bcrypt.hash(userData.password, 10),
            cell_phone: userData.cell_phone
        });

        await user.save();
        
        return {
            success: true,
            user: {
                id: user.id
            }
        }
    } catch (error) {

        log.fatal(JSON.stringify(error));

        return {
            success: false,
            message: error.code && error.code == "23505" ? 'Duplicate email.' : error,
            user: null
        };
    }
};

module.exports.getUser = async (email, password) => {
    
    try {
        const user = await knex.select('is_active')
        .from('users')
        .where({ 'email': email })
        .returning('*');

        return user.length == 0 ? null : user[0];
        
    } catch (error) {
        log.fatal(error);
        throw error;
    }
};

module.exports.updateLastAccess = async (userId) => {
    
    try {
        User
            .where('id', userId)
            .save({ 'last_accessed_at': moment().format() },
            {
                method: 'update',
                patch: true
            }
        );

    } catch (error) {
        log.fatal(error);
        throw error;
    }
};