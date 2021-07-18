import axios from 'axios';
import socket from 'socket.io-client';

const socketUrl = 'ws://119.45.209.166:3000';
const apiUrl = 'http://119.45.209.166:3000';
const io = socket(socketUrl);

export const get = (url, opt = {}) => {
    return axios.get(apiUrl  + url, opt);
}

export const post = (url, opt = {}) => {
    return axios.post(apiUrl  + url, opt);
}

export const wsEmit = (type, msg, fn) => {
    io.emit(type, msg, fn)
}
export const wsOn = (type, callback) => {
    io.on(type, callback)
}

export default axios;
