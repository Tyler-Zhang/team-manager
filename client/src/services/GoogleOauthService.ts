import { apiConfig } from '../config/apiConfig';
import axios from '../utils/axios';

export function getRedirectUrl() {
  return axios.get(`${apiConfig.API_BASE_URL}/google_oauth/redirect_url`);
}
