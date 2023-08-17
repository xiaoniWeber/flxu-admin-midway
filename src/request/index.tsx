import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { useGlobalStore } from "@/store/global";
// import {router} from '@/router';
import loginService from "@/pages/login/service";
import { antdUtils } from "@/utils/antd";

const refreshTokenUrl = "/api/auth/refresh/token";

export type Response<T> = Promise<[boolean, T, AxiosResponse<T>]>;

class Request {
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);

    this.axiosInstance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) =>
        this.requestInterceptor(axiosConfig)
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) =>
        this.responseSuccessInterceptor(response),
      (error: any) => this.responseErrorInterceptor(error)
    );
  }

  private axiosInstance: AxiosInstance;

  private refreshTokenFlag = false; // 是否正在刷新token
  private requestQueue: {
    //请求队列
    resolve: any;
    config: any;
    type: "reuqest" | "response";
  }[] = [];
  private limit = 3;

  private requestingCount = 0;

  setLimit(limit: number) {
    this.limit = limit;
  }

  private async requestInterceptor(
    axiosConfig: InternalAxiosRequestConfig
  ): Promise<any> {
    if ([refreshTokenUrl].includes(axiosConfig.url || "")) {
      return Promise.resolve(axiosConfig);
    }

    if (this.refreshTokenFlag || this.requestingCount >= this.limit) {
      return new Promise((resolve) => {
        this.requestQueue.push({
          resolve,
          config: axiosConfig,
          type: "reuqest",
        });
      });
    }

    this.requestingCount += 1;

    const { token } = useGlobalStore.getState();

    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(axiosConfig);
  }
  // 从队列中取出请求
  private requestByQueue() {
    if (!this.requestQueue.length) return;

    console.log(
      this.requestingCount,
      this.limit - this.requestingCount,
      "count"
    );

    Array.from({ length: this.limit - this.requestingCount }).forEach(
      async () => {
        const record = this.requestQueue.shift();
        if (!record) {
          return;
        }

        const { config, resolve, type } = record;
        // 如果相应401 取到config直接再请求一下
        if (type === "response") {
          resolve(await this.request(config));
        } else if (type === "reuqest") {
          // 如果在请求拦截器中被拦截 只需要执行resolve方法，把config放进去，
          // 这里需要将新的token放进去
          this.requestingCount += 1;
          const { token } = useGlobalStore.getState();
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        }
      }
    );
  }

  private async refreshToken() {
    const { refreshToken } = useGlobalStore.getState();
    // 如果刷新token 不存在 就跳去登录页
    if (!refreshToken) {
      this.toLoginPage();
    }
    // 调用刷新token接口
    const [error, data] = await loginService.rerefshToken(refreshToken);
    // 如果刷新token失败 就跳去登录页
    if (error) {
      this.toLoginPage();
    }
    // 如果刷新token成功 就更新token
    useGlobalStore.setState({
      refreshToken: data.refreshToken,
      token: data.token,
    });
    // 重置刷新token标识
    this.refreshTokenFlag = false;

    this.requestByQueue();
  }

  private async responseSuccessInterceptor(
    response: AxiosResponse<any, any>
  ): Promise<any> {
    if (response.config.url !== refreshTokenUrl) {
      this.requestingCount -= 1;
      if (this.requestQueue.length) {
        this.requestByQueue();
      }
    }

    return Promise.resolve([false, response.data, response]);
  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    this.requestingCount -= 1;
    const { config, status } = error?.response || {};

    if (status === 401) {
      //如果接口是401 把当前接口插入到队列中 然后刷新token
      return new Promise((resolve) => {
        this.requestQueue.unshift({ resolve, config, type: "response" });
        if (this.refreshTokenFlag) return;

        this.refreshTokenFlag = true;
        this.refreshToken();
      });
    } else {
      antdUtils.notification?.error({
        message: "出错了",
        description: error?.response?.data?.message,
      });
      return Promise.resolve([true, error?.response?.data]);
    }
  }

  private reset() {
    this.requestQueue = [];
    this.refreshTokenFlag = false;
    this.requestingCount = 0;
  }

  private toLoginPage() {
    this.reset();
    // router.navigate('/user/login');
  }

  request<T, D = any>(config: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance(config);
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Response<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Response<T> {
    return this.axiosInstance.put(url, data, config);
  }

  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.delete(url, config);
  }
}

const request = new Request({ timeout: 60 * 1000 * 5 });

export default request;
