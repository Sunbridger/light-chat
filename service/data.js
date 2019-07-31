const mysql = require('mysql')
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});
let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

const addUser = (params) => {
    const { name, age } = params;
    let _sql = `insert into user_table(name, age) value('${name}',${age})`
    return query(_sql);
}

module.exports = {
    addUser
};