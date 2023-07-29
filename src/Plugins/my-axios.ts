// Set config defaults when creating the instance
import axios, {AxiosInstance} from "axios";
import {useRoute, useRouter} from "vue-router";


const isDev = process.env.Node_ENV === "development";

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8097/api' : "https://xxx.com:8097/api",
});

myAxios.defaults.withCredentials = true;



// Add a request interceptor
/**
 * 请求拦截器
 */
myAxios.interceptors.request.use(function (config) {
    console.log("准备发送请求", config);
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("收到请求", response);
    // Do something with response data

    if (response?.data?.code == 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;


