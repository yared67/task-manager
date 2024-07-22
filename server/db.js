const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({

    user: 'postgres',
    password:'yared@21',
    host: 'localhost',
    port:5432,
    database:'todowebapp',

})
module.exports = pool