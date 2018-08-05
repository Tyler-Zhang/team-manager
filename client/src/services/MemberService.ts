import { apiConfig } from '../config/apiConfig';
import { IMember } from '../models';
import axios from '../utils/axios';

export function get() {
  return axios.get<IMember[]>(`${apiConfig.API_BASE_URL}/members`);
}
