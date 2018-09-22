import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { GoogleIncomingWebhook, ExternalConnection, GoogleExternalConnection } from '../../../models';
import { Disable } from './Disable';
import { ExternalConnectionOperations } from '../..';
import { google } from 'googleapis';

@Operation('GoogleIncomingWebhook')
export class GoogleIncomingWebhookDisable extends Disable<GoogleIncomingWebhook> {
  public static run(args: IModelApplicationOperationArgs<GoogleIncomingWebhook>): Promise<GoogleIncomingWebhook> {
    return super.run(args) as any;
  }

  protected async disableWebhook() {
    const externalConnection = await this.getValidExternalConnection();
    
    const driveClient = google.drive({
      version: 'v3',
      auth: externalConnection.toGoogleAuthClient()
    });

    await driveClient.channels.stop({
      requestBody: {
        id: this.model.externalId
      }
    });
  }

  private async getValidExternalConnection() {
    let externalConnection: GoogleExternalConnection;
    
    if(this.model.externalConnection) {
      externalConnection = this.model.externalConnection;
    } else {
      externalConnection = await this.entityManager.findOneOrFail(
        ExternalConnection, 
        this.model.externalConnectionId
      ) as any;
    }

    await ExternalConnectionOperations.EnsureValid.run({
      model: externalConnection,
      entityManager: this.entityManager
    });

    return externalConnection;
  }
}
