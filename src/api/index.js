import axios from 'axios';
import socket from 'socket.io-client';

const socketUrl = process.env.VUE_APP_SOCKET;
const apiUrl = process.env.VUE_APP_API;
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
