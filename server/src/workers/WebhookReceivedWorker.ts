import { ApplicationWorker } from './ApplicationWorker';
import { IncomingWebhookOperations } from '../operations';
import { IncomingWebhook } from '../models';
import { IWebhookReceivedJobPayload } from '../publishers';
import { Job } from 'bull';

export class WebhookReceivedWorker extends ApplicationWorker<IWebhookReceivedJobPayload> {
  protected async process(job: Job<IWebhookReceivedJobPayload>) {
    const incomingWebhook = await IncomingWebhook.findOne({
      where: {
        externalId: job.data.externalId
      }
    });

    if (!incomingWebhook) {
      /**
       * We don't have the webhook, it might've been deleted
       */
      this.log.info(`Could not find IncomingWebhook by id ${job.data.externalId}`);
      return;
    }
    
    await IncomingWebhookOperations.ProcessEvent.run({
      model: incomingWebhook,
      event: job.data
    });
  }
}
