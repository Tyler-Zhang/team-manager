import { DBApplicationWorker } from './ApplicationWorker';
import { ExternalConnectionOperations } from '../operations';
import { ExternalConnection } from '../models';

interface ISyncResourcesJob {
  externalConnectionId: number;
}

export class SyncResourcesQueueWorker extends DBApplicationWorker {
  protected async process(job: ISyncResourcesJob) {
    const externalConnection = await ExternalConnection.findOne(job.externalConnectionId);

    if (!externalConnection) {
      throw new Error(`Could not find externalConnection by id ${job.externalConnectionId}`);
    }
    
    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection });
  }
}
