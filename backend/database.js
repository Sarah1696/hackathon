import mysql from 'mysql2/promise.js'

const db_sql = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'654321',
    database:'hackathon'
})

export default db_sql