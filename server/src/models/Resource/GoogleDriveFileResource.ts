import { Resource } from '../Resource/Resource';
import { ChildEntity } from 'typeorm';
import { Model } from '../../lib/sti-model-operations';

export enum FilePermission {
  read = 'read',
  write = 'write'
}

@Model('GoogleDriveFileResource')
@ChildEntity('Resource>GoogleDriveFileResource')
export class GoogleDriveFileResource extends Resource {
  get fileId(): string {
    return this.data.fileId;
  }

  set fileId(fileId: string) {
    this.data.fileId = fileId;
  }

  get filePermission(): FilePermission {
    return this.data.filePermission;
  }

  set filePermission(filePermission: FilePermission) {
    this.data.filePermission = filePermission;
  }
}
