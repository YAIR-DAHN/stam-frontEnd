import axios from 'axios';

export default {
    url: process.env.VUE_APP_URL_SERVER,
    token: localStorage.getItem('token'),
    getData: function(path, param = '') {
        try {
            return axios.get(`${this.url}/${path}${param}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}` 
                }
            });
        }
        catch (error) {
            console.error(error);
        }
        
    },
    postData: function(path, data) {
        try {
            return axios.post(`${this.url}/${path}`, data, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    putData: function(path, data) {
        try {
            return axios.put(`${this.url}/${path}`, data, {
                headers: {
                    'Authorization': `Bearer ${this.token}` 
                }
            });
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
}