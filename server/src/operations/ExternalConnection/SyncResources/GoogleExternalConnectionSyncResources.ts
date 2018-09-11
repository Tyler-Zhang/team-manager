import { SyncResources } from './SyncResources';
import { Operation } from '../../../lib/sti-model-operations';
import { GoogleExternalConnection } from '../../../models';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { log } from '../../../config';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionSyncResources extends SyncResources {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  public model!: GoogleExternalConnection;

  public async run() {
    log.info('Sync resources called');
    return;
  }
}
