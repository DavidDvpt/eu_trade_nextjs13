type APIError = { status: number; message: string; error?: any };

type ApiType<T> = { status: ApiStatusEnum; result: T; error?: any };

interface PostUpdateEntity {
  url: string;
  body: QueryAndParams;
  params?: AxiosRequestConfig;
}

type QueryAndParams = { [x: string]: any };
