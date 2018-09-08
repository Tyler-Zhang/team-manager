import { ExternalConnection } from './ExternalConnection';
import { GoogleExternalConnection } from './GoogleExternalConnection';
import { factoryCreator } from '../../lib/factoryCreator';

const typeMap = {
  ExternalConnection,
  GoogleExternalConnection
}

export const createExternalConnection = factoryCreator<typeof ExternalConnection>(
  typeMap,
  ExternalConnection
);
