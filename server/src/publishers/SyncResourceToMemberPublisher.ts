import { ApplicationPublisher } from './ApplicationPublisher';
import { syncResourceToMemberQueue } from '../config/bullConfig';

export interface ISyncResourceToMemberJobPayload {
  resourceId: number;
  memberId: number;
}

export class SyncResourceToMemberPublisher extends ApplicationPublisher<ISyncResourceToMemberJobPayload> {
  public publish(job: ISyncResourceToMemberJobPayload) {
    return syncResourceToMemberQueue.add(job);
  }
}

export const syncResourceToMemberPublisher = new SyncResourceToMemberPublisher();
