import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { IncomingWebhook } from '../../../models';

@Operation('IncomingWebhook')
export abstract class CreateAndEnable<T extends IncomingWebhook> extends ModelApplicationOperation<T> {
  public static run(args: IModelApplicationOperationArgs<IncomingWebhook>): Promise<IncomingWebhook> {
    return super.run(args);
  }

  public async run() {
    this.entityManager.transaction(async (transaction) => {
      await this.entityManager.save(this.model);
      await this.enableWebhook();

      this.model.isEnabled = true;
      await this.entityManager.save(this.model);
    });
  }

  protected abstract async enableWebhook();
}
