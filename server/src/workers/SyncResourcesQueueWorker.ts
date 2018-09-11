import { DBApplicationWorker } from './ApplicationWorker';
import { ExternalConnectionOperations } from '../operations';
import { ExternalConnection } from '../models';
import { ISyncResourcesJobPayload } from '../publishers';

export class SyncResourcesQueueWorker extends DBApplicationWorker<ISyncResourcesJobPayload> {
  protected async process(job: ISyncResourcesJobPayload) {
    const externalConnection = await ExternalConnection.findOne(job.externalConnectionId);

    if (!externalConnection) {
      throw new Error(`Could not find externalConnection by id ${job.externalConnectionId}`);
    }
    
    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection });
  }
}
