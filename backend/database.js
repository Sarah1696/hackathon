import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv';

dotenv.config();

const db_sql = await mysql.createConnection({
    host:'localhost',
    user:'nini',
    password:'@AthenaAthena1!',
    user:'root',
    password:'654321',
    database:'hackathon'
})

export default db_sql;
