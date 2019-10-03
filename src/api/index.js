import axios from 'axios';
import socket from 'socket.io-client';
const io = socket('ws://192.168.2.191:3000');
const productionBase = 'http://192.168.2.191:3000';

export const get = (url, opt = {}) => {
    return axios.get(productionBase  + url, opt);
}

export const post = (url, opt = {}) => {
    return axios.post(productionBase  + url, opt);
}

export const wsEmit = (type, msg, fn) => {
    io.emit(type, msg, fn)
}
export const wsOn = (type, callback) => {
    io.on(type, callback)
}

export default axios;