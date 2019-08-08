import axios from 'axios';
import socket from 'socket.io-client';

const io = socket('wss://2261295nz5.51mypc.cn');
const productionBase = 'https://2261295nz5.51mypc.cn';

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
