import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import LocalStorage from "./LocalStorage/LocalStorage";
interface AxiosService {
  BACKEND_BASE_URL: string;
  readonly axiosInstance: AxiosInstance;
  getAxiosInstance: () => AxiosInstance;
}

class RestAxiosService implements AxiosService {
  public BACKEND_BASE_URL = "https://localhost:500/";
  public readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.BACKEND_BASE_URL,
    });

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const userAuthenticationToken = LocalStorage.getAuthorizationToken();
      if (userAuthenticationToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${userAuthenticationToken}`,
        };
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      return config;
    });
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}

export default new RestAxiosService().getAxiosInstance();
