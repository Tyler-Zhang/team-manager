import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { ExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { ExternalConnectionOperations } from '../..';

@Operation('ExternalConnection')
export class EnsureValid extends ModelApplicationOperation<ExternalConnection> {
  public static run(args: IModelApplicationOperationArgs<ExternalConnection>): Promise<ExternalConnection> {
    return super.run(args);
  }

  public async run() {
    if (await this.shouldRenew()) {
      ExternalConnectionOperations.EnsureValid.run({ 
        model: this.model, 
        entityManager: this.entityManager 
      });
    }
  }

  protected async shouldRenew() {
    return !this.model.isValid;
  }
}
