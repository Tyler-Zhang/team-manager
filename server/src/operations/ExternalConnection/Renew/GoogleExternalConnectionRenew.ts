import { Renew } from './Renew';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { GoogleExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { createGoogleOauth2Client } from '../../../config';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionRenew extends Renew {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  protected model!: GoogleExternalConnection;

  public async run() {
    await super.run();

    const googleOauth2Client = createGoogleOauth2Client();

    googleOauth2Client.setCredentials(this.model.credentials);
    const { credentials: refreshedCredentials } = await googleOauth2Client.refreshAccessToken();
    
    this.model.credentials = refreshedCredentials;
    
    await this.model.save();

    return this.model;
  }
}
