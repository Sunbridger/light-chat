const mysql = require('mysql')
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test',
    charset  : 'utf8mb4'
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
                        console.log(err, '1 err')
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
    let _sql = `insert into user(name, password, avatar) value('${name}','${password}', '${avatar}')`;
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
const savemsg = (params: {from: number, to: number, msg: string}) => {
    const { from, to, msg } = params;
    const _sql = `insert into chatmsg(fromuid, touid, msg) value(${from},${to},'${msg}')`;
    return query(_sql);
};

const getmsgoto = (params: {uid1: number, uid2: number}) => {
    const { uid1, uid2 } = params;
    const _sql = `select * from chatmsg where (fromuid=${uid1} and touid=${uid2}) or (fromuid=${uid2} and touid=${uid1})  order by time asc`;
    return query(_sql);
};
const getuser = (params: {uid: number}) => {
    const { uid } = params;
    // limit 0,20 
    const _sql = `select name,online,avatar,uid from user where uid!=${uid} order by time desc,online desc`;
    return query(_sql);
}
const online = (uid: number) => {
    const _sql = `update user set online=1 where uid=${uid}`;
    return query(_sql);
};
const offline = (uid: number) => {
    const _sql = `update user set online=0 where uid=${uid}`;
    return query(_sql);
};
const getAllMsgHasMe = async (uid: number) => {
    const _sql = `select * from chatmsg group by fromuid where  touid=${uid} order by time desc`
    return query(_sql);
}
const whoOnline = async (uid: number) => {
    const _sql = `select uid from user where online=1 and uid!=${uid}`;
    return query(_sql);
};
const sendArticle = (params: {ispublic: number; article: string; user: {uid: number; name: string; avatar: string}}) => {
    const { user , ispublic, article} = params; 
    const { uid, name, avatar } = user;
    const _sql = `insert into article (uid, name, avatar,article,ispublic ) value(${uid},'${name}','${avatar}','${article}', ${ispublic})`
    return query(_sql);
};
const getArticle = (params: any) => {
    const { uid } = params;
    let _sql = '';
    if (uid) {
        _sql = `select * from article where uid=${uid} and ispublic=0 order by time desc`
    } else {
        _sql = `select * from article order by time desc`
    }
    return query(_sql);
}

export {
    register,
    login,
    userInfo,
    savemsg,
    getmsgoto,
    getuser,
    online,
    offline,
    whoOnline,
    sendArticle,
    getArticle
}