import { DBApplicationWorker } from './ApplicationWorker';
import { ExternalConnectionOperations } from '../operations';
import { Member, Resource } from '../models';
import { ISyncResourceToMemberJobPayload } from '../publishers';
import { Job } from 'bull';

export class SyncResourcesFromExternalConnectionWorker extends DBApplicationWorker<ISyncResourceToMemberJobPayload> {
  protected async process(job: Job<ISyncResourceToMemberJobPayload>) {
    const { memberId, resourceId } = job.data;

    const member = await Member.findOne(memberId);
    if (!member) {
      throw new Error(`Could not find member by id ${memberId}`);
    }

    const resource = await Resource.findOne(resourceId);
    if (!resource) {
      throw new Error(`Could not find resource by id ${resourceId}`);
    }

    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection });
  }
}
