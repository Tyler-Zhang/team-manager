import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../ApplicationOperation';
import { ExternalConnection } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('ExternalConnection')
export class Create extends ModelApplicationOperation<ExternalConnection> {
  public static run(args: IModelApplicationOperationArgs<ExternalConnection>): Promise<ExternalConnection> {
    return super.run(args);
  }

  public async run() {
    return this.entityManager.save(this.model);
  }
}
