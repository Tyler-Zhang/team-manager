import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { GoogleIncomingWebhook, ExternalConnection } from '../../../models';
import { CreateAndEnable } from './CreateAndEnable';
import { google } from 'googleapis';
import { googleConfig } from '../../../config';
import { ExternalConnectionOperations } from '../..';

@Operation('GoogleIncomingWebhook')
export class GoogleIncomingWebhookCreateAndEnable extends CreateAndEnable<GoogleIncomingWebhook> {
  public static run(args: IModelApplicationOperationArgs<GoogleIncomingWebhook>): Promise<GoogleIncomingWebhook> {
    return super.run(args) as any;
  }

  protected async enableWebhook() {
    await this.hydrateExternalConnection();

    await ExternalConnectionOperations.EnsureValid.run({ 
      model: this.model.externalConnection,
      entityManager: this.entityManager
    });
    
    const googleAuthClient = this.model.externalConnection.toGoogleAuthClient();
    
    const googleDriveClient = google.drive({
      version: 'v3',
      auth: googleAuthClient
    });

    const response = await googleDriveClient.files.watch({
      requestBody: {
        id: this.model.externalId,
        type: 'webhook',
        address: this.model.address,
        expiration: (Date.now() + googleConfig.maxWebhookTTL).toString()
      },
      fileId: 'root'
    });
    
    this.model.expirationDate = new Date(Number(response.data.expiration));
  }

  private async hydrateExternalConnection() {
    if (this.model.externalConnection) {
      return;
    }

    this.model.externalConnection = await this.entityManager.findOneOrFail(
      ExternalConnection,
      this.model.externalConnectionId
    ) as any;
  }
}
