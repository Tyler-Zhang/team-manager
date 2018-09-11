import { ApplicationPublisher } from './ApplicationPublisher';
import { syncResourceQueue } from '../config/bullConfig';
import { Service } from 'typedi';

export interface ISyncResourcesJobPayload {
  externalConnectionId: number;
}

@Service()
export class SyncResourcesPublisher extends ApplicationPublisher<ISyncResourcesJobPayload> {
  public publish(job: ISyncResourcesJobPayload) {
    return syncResourceQueue.add(job);
  }
}
