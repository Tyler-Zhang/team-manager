import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { ExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { ExternalConnectionOperations } from '../..';

@Operation('ExternalConnection')
export class SyncResources extends ModelApplicationOperation<ExternalConnection> {
  public static run(args: IModelApplicationOperationArgs<ExternalConnection>, async?: boolean): Promise<ExternalConnection> {
    return super.run(args, async);
  }

  public async run() {
    ExternalConnectionOperations.EnsureValid.run({
      model: this.model,
      entityManager: this.entityManager
    });

    await this.syncResources();

    await this.updateLastResourceSync();
    
    return this.model;
  }

  protected async syncResources() {
    return;
  }

  protected async updateLastResourceSync() {
    this.model.lastResourceSync = new Date();
    await this.model.save();
  }
}
