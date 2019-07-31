import axios from 'axios';

export const get = (url, opt = {}) => {
    return axios.get('/api' + url, opt);
}

export const post = (url, opt = {}) => {
    return axios.post('/api' + url, opt);
}
