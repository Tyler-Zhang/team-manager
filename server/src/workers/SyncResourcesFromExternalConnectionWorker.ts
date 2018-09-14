import { DBApplicationWorker } from './ApplicationWorker';
import { ExternalConnectionOperations } from '../operations';
import { ExternalConnection } from '../models';
import { ISyncResourcesFromExternalConnectionJobPayload } from '../publishers';
import { Job } from 'bull';

export class SyncResourcesFromExternalConnectionWorker extends DBApplicationWorker<ISyncResourcesFromExternalConnectionJobPayload> {
  protected async process(job: Job<ISyncResourcesFromExternalConnectionJobPayload>) {
    const externalConnection = await ExternalConnection.findOne(job.data.externalConnectionId);

    if (!externalConnection) {
      throw new Error(`Could not find externalConnection by id ${job.data.externalConnectionId}`);
    }
    
    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection });
  }
}
