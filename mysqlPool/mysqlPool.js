const mysql = require('mysql');

const mysql_pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'mobile_shop',
    port: 3306,
    ssl: false
});

exports.mysql_pool = mysql_pool;