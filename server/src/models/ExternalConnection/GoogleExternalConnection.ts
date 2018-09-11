import { ExternalConnection } from './ExternalConnection';
import { ChildEntity } from 'typeorm';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { Model } from '../../lib/sti-model-operations';
import { createGoogleOauth2Client } from '../../config';

const TYPE = "ExternalConnection>GoogleExternalConnection";

@Model('GoogleExternalConnection')
@ChildEntity(TYPE)
export class GoogleExternalConnection extends ExternalConnection {
  public type = TYPE;

  public get isValid() {
    return Date.now() < Number(this.credentials.expiry_date);
  }

  public set credentials(credentials: Credentials) {
    this.data.credentials = credentials;
  }

  public get credentials(): Credentials {
    return { ...this.data.credentials};
  }

  public toGoogleAuthClient() {
    const googleOauth2Client = createGoogleOauth2Client();
    googleOauth2Client.setCredentials(this.credentials);
    
    return googleOauth2Client;
  }
}
