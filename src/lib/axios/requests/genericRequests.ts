import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInstance';

export async function fetchDatas<T>(
  endpoint: string,
  params?: AxiosRequestConfig
) {
  try {
    const response: AxiosResponse = await axiosInstance().get(
      `${endpoint}`,
      params
    );
    console.log('fetchDatas', response);
    return response.data.data as T[];
  } catch (error) {
    return Promise.reject({ status: 500, message: 'fetchDatas error' });
  }
}

export async function fetchScalarData<T>(
  endpoint: string,
  params?: AxiosRequestConfig
) {
  try {
    const response: AxiosResponse = await axiosInstance().get(
      `${endpoint}`,
      params
    );

    return response.data.data && (response.data.data[0] as T);
  } catch (error) {
    return Promise.reject({ status: 500, message: 'fetchDatas error' });
  }
}

export async function fetchSingleData<T>(
  endpoint: string,
  params?: AxiosRequestConfig
) {
  try {
    const response: AxiosResponse = await axiosInstance().get(
      `${endpoint}`,
      params
    );

    return response.data.data as T;
  } catch (error) {
    return Promise.reject({ status: 500, message: 'fetchDatas error' });
  }
}

export async function fetchDataById<T>(
  baseUrl: string,
  id: string,
  params?: AxiosRequestConfig
) {
  try {
    const response: AxiosResponse = await axiosInstance().get(
      `${baseUrl}${id}`,
      params
    );

    return response.data as T;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function postEntity<T>({ url, body, params }: PostUpdateEntity) {
  try {
    const response = await axiosInstance().post(url, body, params);
    return response.data as T;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function updateEntity<T>({ url, body, params }: PostUpdateEntity) {
  try {
    const response = await axiosInstance().put(url, body, params);
    return response.data as T;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export const deleteEntity = async (baseUrl: string, id: string) => {
  try {
    const response = await axiosInstance().delete(`${baseUrl}${id}`);
    return response.status;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
