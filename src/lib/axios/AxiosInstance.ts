import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { error504Traitment, InternalError } from './axiosUtils';

export const onFullfilledRequest = (response: AxiosResponse) => {
  return response;
};

export const onRejectedPublicResponse = (error: any) => {
  const status = error?.response?.data?.code;
  const message = error?.response?.data?.message;

  if (status) {
    switch (status) {
      case 504:
        error504Traitment(error.config)
          .then((response) => response)
          .catch((err) => err);
        break;
      default:
        return Promise.reject({
          status,
          message,
          error: { ...error },
        });
    }
  } else {
    return Promise.reject<APIError>(InternalError);
  }
};

const setResponseInterceptor = (request: AxiosInstance) => {
  request.interceptors.response.use(
    onFullfilledRequest,
    onRejectedPublicResponse
  );
};

export default function axiosInstance() {
  const request = axios.create({
    timeout: 30000,
  });

  setResponseInterceptor(request);

  return request;
}
