import axios from 'axios';
import socket from 'socket.io-client';

import Global from '../../global.js';
const io = socket(Global.replace('http', 'ws'));


export const get = (url, opt = {}) => {
    return axios.get('/api' + url, opt);
}

export const post = (url, opt = {}) => {
    return axios.post('/api' + url, opt);
}

export const wsEmit = (type, msg, fn) => {
    io.emit(type, msg, fn)
}
export const wsOn = (type, callback) => {
    io.on(type, callback)
}
