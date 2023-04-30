type APIError = { status: number; message: string; error?: any };

type ApiType<T> = {
  status: import('./apiTypes.ts').ApiStatusEnum;
  result: T;
  error: any;
};

type QueryAndParams = { [x: string]: any };
interface PostUpdateEntity {
  url: string;
  body: QueryAndParams;
  params?: import('axios').AxiosRequestConfig;
}
