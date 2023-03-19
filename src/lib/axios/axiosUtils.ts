import axios from 'axios';

export const InternalError = (error: any): APIError => {
  return {
    message: 'Erreur durant le requetage',
    status: 500,
    error: { ...error },
  };
};

export const MissingParamsError = (): APIError => {
  return {
    message: 'one or more params missing',
    status: 400,
  };
};

export const timeoutError = (error: any): APIError => {
  return { message: 'timeout', status: 500, error: { ...error } };
};

export const error504Traitment = async (config: any) => {
  return await new Promise((resolve, reject) => {
    axios(config)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
