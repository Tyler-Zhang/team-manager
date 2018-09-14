import { ApplicationPublisher } from './ApplicationPublisher';
import { syncResourceFromExternalConnectionQueue } from '../config/bullConfig';

export interface ISyncResourcesFromExternalConnectionJobPayload {
  externalConnectionId: number;
}

export class SyncResourcesFromExternalConnectionPublisher extends ApplicationPublisher<ISyncResourcesFromExternalConnectionJobPayload> {
  public publish(job: ISyncResourcesFromExternalConnectionJobPayload) {
    return syncResourceFromExternalConnectionQueue.add(job);
  }
}

export const syncResourcesFromExternalConnectionPublisher = new SyncResourcesFromExternalConnectionPublisher();
