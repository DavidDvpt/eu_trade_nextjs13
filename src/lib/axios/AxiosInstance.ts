import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { error504Traitment, InternalError } from './axiosUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    baseURL: API_URL,
    timeout: 30000,
  });

  setResponseInterceptor(request);

  return request;
}

export const fetchDatas = async (endpoint: string, params?: QueryAndParams) => {
  try {
    const response = await axiosInstance().get(`${endpoint}`, { params });
    return response.data ?? response;
  } catch (error) {
    return Promise.reject({ status: 500, message: 'fetchDatas error' });
  }
};

// get one
export const fetchDataById = async (idIri: string, params?: QueryAndParams) => {
  try {
    const response: AxiosResponse = await axiosInstance().get(idIri, {
      params: params,
    });

    return response.data;
  } catch (error: any) {
    return Promise.reject({
      status: 500,
      message: 'fetchDatasById error',
      error: { ...error },
    });
  }
};

// create entity
export const postEntity = async ({ url, body, params }: PostUpdateEntity) => {
  try {
    const response = await axiosInstance().post(url, body, { params });
    return response.data;
  } catch (error: any) {
    return Promise.reject({
      status: 500,
      message: 'postEntity error',
      error: { ...error },
    });
  }
};

// update entity
export const updateEntity = async ({ url, body, params }: PostUpdateEntity) => {
  try {
    const response = await axiosInstance().put(url, body, { params });
    return response.data;
  } catch (error: any) {
    return Promise.reject({
      status: 500,
      message: 'updateEntity error',
      error: { ...error },
    });
  }
};

// delete entity
export const deleteEntity = async (url: string) => {
  try {
    const response = await axiosInstance().delete(url);
    return response.status;
  } catch (error: any) {
    return Promise.reject({
      status: 500,
      message: 'deleteEntity error',
      error: { ...error },
    });
  }
};
