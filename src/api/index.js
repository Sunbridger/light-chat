import axios from 'axios';
import socket from 'socket.io-client';
const io = socket('ws://121.40.152.167');
const productionBase = 'http://121.40.152.167';

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