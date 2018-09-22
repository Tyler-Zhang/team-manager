import { SyncResources } from './SyncResources';
import { Operation } from '../../../lib/sti-model-operations';
import { GoogleExternalConnection, GoogleDriveFileResource, Resource } from '../../../models';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { google } from 'googleapis';
import { ResourceOperations } from '../..';
import { EntityManager } from 'typeorm';

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
      googleDriveFileResource.slatedForDeletion = false;

      return googleDriveFileResource;
    });

    await this.entityManager.transaction(async (transaction) => {
      await this.markResourcesToBeDeleted(transaction);
      /**
       * Use the create operation to create the resources
       */
      const createPromiseArray = googleDriveFileResources.map(googleDriveFileResource => {
        return ResourceOperations.Create.run({ model: googleDriveFileResource, entityManager: transaction});
      });

      await Promise.all(createPromiseArray);

      await this.deleteMarkedForDeletionResources(transaction);
    });
  }

  private async markResourcesToBeDeleted(transaction: EntityManager) {
    return transaction.update(Resource, {
        externalConnectionId: this.model.id
      }, {
        slatedForDeletion: true
      }
    );
  }

  private async deleteMarkedForDeletionResources(transaction: EntityManager) {
    const resourcesMarkedForDeletion = await transaction.find(
      Resource,
      { where: { slatedForDeletion: true }}
    );

    return Promise.all(
      resourcesMarkedForDeletion.map(resource => {
        return ResourceOperations.Delete.run({ model: resource, entityManager: transaction });
      })
    );
  }
}
