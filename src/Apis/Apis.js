import axios from 'axios';

export let endpoints = {
    oauth2_info: '/oauth2-info/',
    get_token: '/o/token/',
    current_user: '/users/current-user/',
};

export default axios.create({
    baseURL: 'http://127.0.0.1:8000',
});
