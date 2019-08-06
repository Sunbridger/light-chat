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
const register = async (params: { name: string; password: any; avatar: string }) => {
    const { name, password, avatar } = params;
    const exis :any= await queryNameReturnPwd(name);
    if (exis[0]) {
        return false; // 用户名已存在
    }
    let _sql = `insert into user(name, password, avatar, time) value('${name}','${password}', '${avatar}', '${new Date()}')`;
    return query(_sql);
};
const queryNameReturnPwd = (name: string) => {
    let _sql = `select password, uid, avatar from user where name='${name}'`;
    return query(_sql);
};
const login = async (params: { name: string, password: any}) => {
    const { name, password } = params;
    const pwd:any= await queryNameReturnPwd(name);
    if (pwd[0] && pwd[0].password === password) {
        return {
            status: true,
            uid: pwd[0].uid,
            avatar: pwd[0].avatar,
            name
        }
    } else {
        return {
            status: false,
            msg: '账号或密码错误'
        }
    }
};
const userInfo = (uid: number) => {
    // TODO: 通过uid查询好友 等信息
};

export {
    register,
    login,
    userInfo
}