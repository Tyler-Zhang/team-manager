import { ApplicationPublisher } from './ApplicationPublisher';
import { webhookReceivedQueue } from '../config/bullConfig';

export interface IWebhookReceivedJobPayload {
  externalId: string;
  createdAt: number;
  extra: any;
}

export class WebhookReceivedPublisher extends ApplicationPublisher<IWebhookReceivedJobPayload> {
  public publish(job: IWebhookReceivedJobPayload) {
    return webhookReceivedQueue.add(job);
  }
}

export const webhookReceivedPublisher = new WebhookReceivedPublisher();
