import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Resource } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";

@Operation('Resource')
export class Delete extends ModelApplicationOperation<Resource> {
  public static run(args: IModelApplicationOperationArgs<Resource>): Promise<Resource> {
    return super.run(args);
  }

  public async run() {
    return this.entityManager.delete(Resource, this.model);
  }
}
