import { Resource } from './Resource';
import { GoogleDriveFileResource } from './GoogleDriveFileResource';
import { factoryCreator } from '../../lib/factoryCreator';

const typeMap = {
  Resource,
  GoogleDriveFileResource
}

export const createResource = factoryCreator<typeof Resource>(
  typeMap,
  Resource
);
