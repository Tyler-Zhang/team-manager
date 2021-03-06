import { ApplicationWorker } from './ApplicationWorker';
import { ResourceOperations } from '../operations';
import { Member, Resource } from '../models';
import { ISyncResourceToMemberJobPayload } from '../publishers';
import { Job } from 'bull';

export class SyncResourceToMemberWorker extends ApplicationWorker<ISyncResourceToMemberJobPayload> {
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

    await ResourceOperations.SyncToMember.run({ model: resource, member });
  }
}
