import { apiConfig } from '../config/apiConfig';
import { ITeam, ProtoModel } from '../models';
import axios from '../utils/axios';

export function get() {
  return axios.get<ITeam[]>(`${apiConfig.API_BASE_URL}/teams`);
}

export function create(member: ProtoModel<ITeam>) {
  return axios.post<ProtoModel<ITeam>>(`${apiConfig.API_BASE_URL}/teams`, member);
}
