import { ApplicationWorker } from './ApplicationWorker';
import { IRenewIncomingWebhooksJobPayload } from '../publishers';
import { Job } from 'bull';
import { IncomingWebhook } from '../models';
import { IncomingWebhookOperations } from '../operations';

export class RenewIncomingWebhooksWorker extends ApplicationWorker<IRenewIncomingWebhooksJobPayload> {
  protected async process(job: Job<IRenewIncomingWebhooksJobPayload>) {
    /**
     * We will find every IncomingWebhook that is enabled and that will in less than
     * an hour and a half. This job should be running every single hour so the 30
     * minutes will be our leeway to ensure everything gets processed
     */
    const incomingWebhooks = await IncomingWebhook.createQueryBuilder('iw')
      .where('iw.isEnabled = true')
      .andWhere('iw.expirationDate - now() < interval \'1 hour\'')
      .getMany();
    
    this.log.info(`Renewing ${incomingWebhooks.length} incoming webhooks`);
    
    await Promise.all(
      incomingWebhooks.map((incomingWebhook) => {
        return IncomingWebhookOperations.Renew.run({ model: incomingWebhook }, true);
      })
    );
  }
}
