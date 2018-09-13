import { apiConfig } from '../config/apiConfig';
import { ITeam, ProtoModel } from '../models';
import axios from '../utils/axios';

export function get() {
  return axios.get<ITeam[]>(`${apiConfig.API_BASE_URL}/teams`);
}

export function create(team: ProtoModel<ITeam>) {
  return axios.post<ProtoModel<ITeam>>(`${apiConfig.API_BASE_URL}/teams`, team);
}

export function remove(id: number) {
  return axios.delete(`${apiConfig.API_BASE_URL}/teams/${id}`);
}

export function patch(team: Partial<ITeam>) {
  return axios.patch(`${apiConfig.API_BASE_URL}/teams/${team.id}`, team);
}
