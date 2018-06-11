import axios from "axios";
import qs from "qs";
import { Message } from "iview";
import router from "../router/index";
import Vue from 'vue';

axios.defaults.timeout = 20000;                        //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = '/ctg-workflow';   //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data,{
            arrayFormat: 'repeat'
        });
    }
    return config;
},(error) =>{
     Message.error("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
    if(res.status!=200){
        // _.toast(res.data.msg);
        return Promise.reject(res);
        var exception = new CommonException('HTTP错误', 1);  
        throw exception;
    }
    return res;
}, (error) => {
    console.log(error.status);
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      if(error.response.status == 401){
        window.location.href = '/#/login';
        return;
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                if(response) resolve(response.data);
            }, err => {
                console.log(err);
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            })
    })
}
