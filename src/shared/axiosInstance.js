import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mysterious-reef-29460.herokuapp.com/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
