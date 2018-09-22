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
      throw new Error(`Could not find IncomingWebhook by id ${job.data.externalId}`);
    }
    
    await IncomingWebhookOperations.ProcessEvent.run({
      model: incomingWebhook,
      event: job.data
    });
  }
}
