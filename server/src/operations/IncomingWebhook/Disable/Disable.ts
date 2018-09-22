import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { IncomingWebhook } from '../../../models';

@Operation('IncomingWebhook')
export abstract class Disable<T extends IncomingWebhook> extends ModelApplicationOperation<T> {
  public static run(args: IModelApplicationOperationArgs<IncomingWebhook>): Promise<IncomingWebhook> {
    return super.run(args);
  }

  public async run() {
    await this.disableWebhook();
    await this.setWebhookToDisabled();
  }

  protected abstract async disableWebhook();

  protected async setWebhookToDisabled() {
    this.model.isEnabled = false;
    return this.entityManager.save(this.model);
  }
}
