"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test',
    charset: 'utf8mb4'
});
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(false);
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        resolve(false);
                        console.log(err, '1 err');
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};
const register = (params) => __awaiter(this, void 0, void 0, function* () {
    const { name, password, avatar } = params;
    const exis = yield queryNameReturnPwd(name);
    if (exis[0]) {
        return false; // 用户名已存在
    }
    let _sql = `insert into user(name, password, avatar) value('${name}','${password}', '${avatar}')`;
    return query(_sql);
});
exports.register = register;
const queryNameReturnPwd = (name) => {
    let _sql = `select password, uid, avatar from user where name='${name}'`;
    return query(_sql);
};
const login = (params) => __awaiter(this, void 0, void 0, function* () {
    const { name, password } = params;
    const pwd = yield queryNameReturnPwd(name);
    if (pwd[0] && pwd[0].password === password) {
        return {
            status: true,
            uid: pwd[0].uid,
            avatar: pwd[0].avatar,
            name
        };
    }
    else {
        return {
            status: false,
            msg: '账号或密码错误'
        };
    }
});
exports.login = login;
const userInfo = (uid) => {
    // TODO: 通过uid查询好友 等信息
};
exports.userInfo = userInfo;
const savemsg = (params) => {
    const { from, to, msg } = params;
    const _sql = `insert into chatmsg(fromuid, touid, msg) value(${from},${to},'${msg}')`;
    return query(_sql);
};
exports.savemsg = savemsg;
const getmsgoto = (params) => {
    const { uid1, uid2 } = params;
    const _sql = `select * from chatmsg where (fromuid=${uid1} and touid=${uid2}) or (fromuid=${uid2} and touid=${uid1})  order by time asc`;
    return query(_sql);
};
exports.getmsgoto = getmsgoto;
const getuser = (params) => {
    const { uid } = params;
    // limit 0,20 
    const _sql = `select name,online,avatar,uid from user where uid!=${uid} order by time desc`;
    return query(_sql);
};
exports.getuser = getuser;
const online = (uid) => {
    const _sql = `update user set online=1 where uid=${uid}`;
    return query(_sql);
};
exports.online = online;
const offline = (uid) => {
    const _sql = `update user set online=0 where uid=${uid}`;
    return query(_sql);
};
exports.offline = offline;
const getAllMsgHasMe = (uid) => __awaiter(this, void 0, void 0, function* () {
    const _sql = `select * from chatmsg group by fromuid where  touid=${uid} order by time desc`;
    return query(_sql);
});
const whoOnline = (uid) => __awaiter(this, void 0, void 0, function* () {
    const _sql = `select uid from user where online=1 and uid!=${uid}`;
    // const data2 = await getAllMsgHasMe(uid);
    const data = yield query(_sql);
    return {
        data,
    };
});
exports.whoOnline = whoOnline;
