import { SyncResources } from './SyncResources';
import { Operation } from '../../../lib/sti-model-operations';
import { GoogleExternalConnection, GoogleDriveFileResource } from '../../../models';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { google } from 'googleapis';
import { ResourceOperations } from '../..';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionSyncResources extends SyncResources {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  public model!: GoogleExternalConnection;

  protected async syncResources() {
    const driveClient = google.drive({
      version: 'v3',
      auth: this.model.toGoogleAuthClient()
    });

    const fileListResponse = await driveClient.files.list({ 
      q: 'trashed = false and \'root\' in parents',
      pageSize: 1000
    });

    const files = fileListResponse.data.files;

    if (!files) {
      return;
    }

    const googleDriveFileResources: GoogleDriveFileResource[] = files.map(file => {
      const googleDriveFileResource = new GoogleDriveFileResource();
      googleDriveFileResource.externalId = file.id as string;
      googleDriveFileResource.name = file.name as string;
      googleDriveFileResource.externalConnectionId = this.model.id;
      googleDriveFileResource.organizationId = this.model.organizationId;

      return googleDriveFileResource;
    });

    await this.entityManager.transaction(async (transaction) => {
      /**
       * Use the create operation to create the resources
       */
      const createPromiseArray = googleDriveFileResources.map(googleDriveFileResource => {
        return ResourceOperations.Create.run({ model: googleDriveFileResource, entityManager: transaction});
      });

      return Promise.all(createPromiseArray);
    });
  }
}
