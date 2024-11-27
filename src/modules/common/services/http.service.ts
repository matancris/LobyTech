import Axios, { ResponseType } from 'axios';
import { config } from '../../../config';
import { errorService } from './error.handling.service';

interface Options {
  headers?: {};
  data?: {} | null;
  params?: {};
  method?: string;
  withToken?: boolean;
  fullUrl?: string;
  responseType?: ResponseType; // Add this line
}

const defaultOptions: Options = { method: 'get', data: null, params: {}, headers: {}, withToken: true, fullUrl: '', responseType: 'json' };

const axios = Axios.create({
  withCredentials: true,
});

// async function getAuthHeader() {
//   return {
//     Authorization: 'Bearer ' + (await authService.getUserToken()),
//   };
// }

export const httpService = {
  ajax,
  get(endpoint: string, options?: Options) {
    return ajax(endpoint, { method: 'GET', ...options });
  },
  post(endpoint: string, options?: Options) {
    return ajax(endpoint, { method: 'POST', ...options });
  },
  put(endpoint: string, options?: Options) {
    return ajax(endpoint, { method: 'PUT', ...options });
  },
  delete(endpoint: string, options?: Options) {
    return ajax(endpoint, { method: 'DELETE', ...options });
  },
  patch(endpoint: string, options?: Options) {
    return ajax(endpoint, { method: 'PATCH', ...options });
  },
};

async function ajax(endpoint: string, options?: Options) {
  options = { ...defaultOptions, ...options };
  const { method, data, params, fullUrl, responseType } = options;

  try {
    const res = await axios({
      url: fullUrl ? fullUrl : `${config.apiUrl}${endpoint}`,
      method,
      data,
      params,
      responseType,
    });
    return res.data;
  } catch (err: any) {
    console.log('http service err:', err);
    return errorService.errorHandler(err);
  }
}
