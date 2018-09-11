import { DBApplicationWorker } from './ApplicationWorker';
import { ExternalConnectionOperations } from '../operations';
import { ExternalConnection } from '../models';
import { ISyncResourcesJobPayload } from '../publishers';
import { Job } from 'bull';

export class SyncResourcesQueueWorker extends DBApplicationWorker<ISyncResourcesJobPayload> {
  protected async process(job: Job<ISyncResourcesJobPayload>) {
    const externalConnection = await ExternalConnection.findOne(job.data.externalConnectionId);

    if (!externalConnection) {
      throw new Error(`Could not find externalConnection by id ${job.data.externalConnectionId}`);
    }
    
    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection });
  }
}
