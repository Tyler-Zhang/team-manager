import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { GoogleIncomingWebhook } from '../../../models';
import { Renew } from './Renew';
import { IncomingWebhookOperations } from '../..';

/**
 * It's not actually possible to renew this webhook because of Google drive's
 * limitation.
 * 
 * We also should not delete this webhook because any jobs that are already
 * in the queue would not be able to process correctly.
 * 
 * The best that we can do is just create a new webhook which is not really
 * "renewing" the sameone
 */
@Operation('GoogleIncomingWebhook')
export class GoogleIncomingWebhookRenew extends Renew<GoogleIncomingWebhook> {
  public static run(args: IModelApplicationOperationArgs<GoogleIncomingWebhook>): Promise<GoogleIncomingWebhook> {
    return super.run(args) as any;
  }

  public async run() {
    const newIncomingWebhook = new GoogleIncomingWebhook();
    newIncomingWebhook.externalConnectionId = this.model.externalConnectionId;
    
    return this.entityManager.transaction(async (transaction) => {
      // Enable the new webhook
      await IncomingWebhookOperations.CreateAndEnable.run({
        model: newIncomingWebhook,
        entityManager: transaction
      });

      // Disable the existing webhook
      await IncomingWebhookOperations.Disable.run({
        model: this.model,
        entityManager: this.entityManager
      })

      return newIncomingWebhook;
    });
  }
}
