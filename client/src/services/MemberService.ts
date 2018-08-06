import { apiConfig } from '../config/apiConfig';
import { IMember, ProtoModel } from '../models';
import axios from '../utils/axios';

export function get() {
  return axios.get<IMember[]>(`${apiConfig.API_BASE_URL}/members`);
}

export function create(member: ProtoModel<IMember>) {
  return axios.post<ProtoModel<IMember>>(`${apiConfig.API_BASE_URL}/members`, member);
}
