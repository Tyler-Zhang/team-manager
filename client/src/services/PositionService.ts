import { apiConfig } from '../config/apiConfig';
import axios from '../utils/axios';

export function remove(id: number) {
  return axios.delete(`${apiConfig.API_BASE_URL}/positions/${id}`);
}
