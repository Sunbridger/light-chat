const mysql = require('mysql')
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});
let query = function( sql: string, values?: any ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err: any, connection: { query: (arg0: string, arg1: any, arg2: (err: any, rows: any) => void) => void; release: () => void; }) {
            if (err) {
                resolve(false)
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        resolve(false)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

const addUser = (params: { name: any; age: any; }) => {
    const { name, age } = params;
    let _sql = `insert into user_table(name, age) value('${name}',${age})`
    return query(_sql);
}

module.exports = {
    addUser
};