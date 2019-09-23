import knex from '../utils/knex';

export function getLoggedinUser(user) {
    return knex('users')
        .where('id', '=', user.id)
        .select('name', 'email')
        .first();
}