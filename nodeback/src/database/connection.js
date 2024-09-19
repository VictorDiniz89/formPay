const knex = require ('knex')({
    client: 'mysql2',
    connection: {
        host: 'mysql41-farm10.kinghost.net',
        user: 'iderptx',
        password: 'ecesponline2024',
        database: 'iderptx'
    }
})
module.exports = knex