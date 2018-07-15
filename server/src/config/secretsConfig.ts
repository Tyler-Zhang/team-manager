import { get } from 'lodash';

const privateKey = get(process.env, 'PRIVATE_KEY');

if (!privateKey) {
  throw new Error('Environment variable PRIVATE_KEY must be set');
}

export const secretsConfig = {
  privateKey
}
