import { ApplicationPublisher } from './ApplicationPublisher';
import { syncResourceQueue } from '../config/bullConfig';

export interface ISyncResourcesJobPayload {
  externalConnectionId: number;
}

export class SyncResourcesPublisher extends ApplicationPublisher<ISyncResourcesJobPayload> {
  public publish(job: ISyncResourcesJobPayload) {
    return syncResourceQueue.add(job);
  }
}

export const syncResourcesPublisher = new SyncResourcesPublisher();
