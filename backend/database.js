import mysql from 'mysql2/promise.js'


dotenv.config();

const db_sql = await mysql.createConnection({
    host:'localhost',
    /* user:'nini',
    password:'@AthenaAthena1!', */
    user:'root',
    password:'654321',
    database:'user_hack'

})


export default db_sql;


