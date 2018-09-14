import { ModelApplicationOperation, IModelApplicationOperationArgs } from './ModelApplicationOperation';

export interface IPatchModelApplicationOperationArgs<T> extends IModelApplicationOperationArgs<T> {
  changes: Partial<T>
}

export class PatchModelApplicationOperation<T> extends ModelApplicationOperation<T> {
  protected changes: Partial<T>;

  constructor({ changes }: IPatchModelApplicationOperationArgs<T>) {
    super(arguments[0]);
    
    this.changes = changes;
  }
}
