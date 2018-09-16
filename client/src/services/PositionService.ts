import { apiConfig } from '../config/apiConfig';
import { IPosition, ProtoModel } from '../models';
import axios from '../utils/axios';

export function remove(id: number) {
  return axios.delete(`${apiConfig.API_BASE_URL}/positions/${id}`);
}

export function create(position: ProtoModel<IPosition>) {
  return axios.post(`${apiConfig.API_BASE_URL}/positions`, position);
}
