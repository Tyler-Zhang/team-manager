import { ModelApplicationOperation, IModelApplicationOperationArgs } from './ModelApplicationOperation';
import { ApplicationEntity } from '../../models/ApplicationEntity';

export interface IPatchModelApplicationOperationArgs<T extends ApplicationEntity> extends IModelApplicationOperationArgs<T> {
  changes: Partial<T>
}

export class PatchModelApplicationOperation<T extends ApplicationEntity> extends ModelApplicationOperation<T> {
  protected changes: Partial<T>;

  constructor({ changes }: IPatchModelApplicationOperationArgs<T>) {
    super(arguments[0]);
    
    this.changes = changes;
  }
}
