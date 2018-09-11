import { Resource } from '../Resource/Resource';
import { ChildEntity } from 'typeorm';
import { Model } from '../../lib/sti-model-operations';

const TYPE = 'Resource>GoogleDriveFileResource';

@Model('GoogleDriveFileResource')
@ChildEntity(TYPE)
export class GoogleDriveFileResource extends Resource {
  public type = TYPE;
}
