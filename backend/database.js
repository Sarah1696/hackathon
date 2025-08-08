import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv';

dotenv.config();

const db_sql = await mysql.createPool({
    host:'localhost',
   
    user:'root',
    password:'654321',
    database:'user_hack'

})

export default db_sql;