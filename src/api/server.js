import axios from 'axios';
import envconfig  from '../envconfig/envconfig';

export default class Server {
    //封装自己的异步请求，返回promise对象
    myAxios(method, url, config) {
        return new Promise((resolve, reject) => {
            if(typeof config !== 'object') config = {};
            // 建立axios配置参数
            let _config = {
                method,
                url,
                baseURL: envconfig.baseURL,
                timeout: 30000,
                params: null,
                data: null,
                headers: null,
                withCredentials: true, //设置是否携带cookies发起请求
                validateStatus: status => {
                    return status >= 200 && status < 300;
                },
                ...config,
            }
            
            axios.request(_config)
            .then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
            })
            .catch(error => {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            })
        })
    }
}