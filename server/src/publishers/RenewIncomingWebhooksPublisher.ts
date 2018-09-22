import { ApplicationPublisher } from './ApplicationPublisher';
import { renewIncomingWebhooksQueue } from '../config/bullConfig';

export interface IRenewIncomingWebhooksJobPayload {}

export class RenewIncomingWebhooksPublisher extends ApplicationPublisher<IRenewIncomingWebhooksJobPayload> {
  public publish(job: IRenewIncomingWebhooksJobPayload) {
    return renewIncomingWebhooksQueue.add(job);
  }
}

export const renewIncomingWebhooksPublisher = new RenewIncomingWebhooksPublisher();
