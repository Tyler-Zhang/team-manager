import { apiConfig } from '../config/apiConfig';
import { IMember, IOrganization, ProtoModel } from '../models';
import axios from '../utils/axios';

export function init(params: {
  organization: ProtoModel<IOrganization>,
  member: ProtoModel<IMember>
}) {
  return axios.post(`${apiConfig.API_BASE_URL}/organizations/init`, params);
}
