/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//elm.cangdu.org/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://172.29.64.19:8080';
}else{
  baseURL = 'http://localhost:8080';
}

export default {imgUrl, baseURL}