import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { GoogleIncomingWebhook } from '../../../models';
import { CreateAndEnable } from './CreateAndEnable';
import { google } from 'googleapis';
import { googleConfig } from '../../../config';

@Operation('GoogleIncomingWebhook')
export class GoogleIncomingWebhookCreateAndEnable extends CreateAndEnable<GoogleIncomingWebhook> {
  public static run(args: IModelApplicationOperationArgs<GoogleIncomingWebhook>): Promise<GoogleIncomingWebhook> {
    return super.run(args) as any;
  }

  protected async enableWebhook() {
    const googleAuthClient = this.model.externalConnection.toGoogleAuthClient();
    
    const googleDriveClient = google.drive({
      version: 'v3',
      auth: googleAuthClient
    });

    const startPageToken = await googleDriveClient.changes.getStartPageToken();

    const response = await googleDriveClient.files.watch({
      requestBody: {
        id: this.model.externalId,
        type: 'webhook',
        address: this.model.address,
        expiration: (Date.now() + googleConfig.maxWebhookTTL).toString()
      },
      fileId: 'root'
    });
    
    this.model.expirationDate = new Date(Date.now() + Number(response.data.expiration));
  }
}
