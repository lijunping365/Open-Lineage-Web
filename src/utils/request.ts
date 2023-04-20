import axios from 'axios';

let baseURL: string;
if (import.meta.env.DEV) {
  baseURL = 'http://10.36.218.98:8080/';
} else {
  baseURL = 'http://localhost:8080/';
}

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    if (!response || !response.status) {
      throw new Error('网络异常，请检查您的网络');
    }
    if (response.status !== 200) {
      throw new Error(`请求错误 ${response.status}: ${response.config.url}`);
    }
    const result = response.data;
    if (result.code === 200) {
      return result.data;
    }
    throw new Error(`业务异常 ${result.code}: ${response.config.url}`);
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
