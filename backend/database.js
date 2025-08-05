import mysql from 'mysql2/promise.js'

const db_sql = await mysql.createConnection({
    host: 'mysql-afechackathon.alwaysdata.net',
    user: '425308',
    password: '@France1!', 
    database: 'afechackathon_db'
})

export default db_sql;
