import { apiConfig } from '../config/apiConfig';
import axios from '../utils/axios';

export interface ILoginParams {
  email: string;
  password: string;
}

export function login(params: ILoginParams) {
  return axios.post(`${apiConfig.API_BASE_URL}/authentication/login`, params);
}

export function reauthenticate() {
  return axios.post(`${apiConfig.API_BASE_URL}/authentication/reauthenticate`);
}
