import axios from 'axios';
import socket from 'socket.io-client';

const io = socket('ws://172.18.12.87:3000');

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
