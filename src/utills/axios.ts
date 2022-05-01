import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface CallAxiosAPI {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
  params?: string;
  isAuthentication?: boolean;
}

const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const callAxios = async ({
  url,
  method,
  data,
  headers,
  params,
}: CallAxiosAPI) => {
  const token = await localStorage.getItem('CPQ_ACCESS_TOKEN');
  const accessToken = token !== null ? JSON.parse(token) : null;

  const config: AxiosRequestConfig = {
    method: method || 'GET',
    url: `${baseUrl}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: accessToken !== null ? `Bearer ${accessToken}` : '',
      ...headers,
    },
    data,
    params,
    timeout: 20000,
  };
  return axios(config)
    .then((res: AxiosResponse<any, any>) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
