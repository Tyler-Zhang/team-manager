import { JsonController, Redirect, Get, BadRequestError, QueryParam } from 'routing-controllers'
import { createGoogleOauth2Client } from '../config';
import authenticatedContext from '../authorization/authenticatedContext';
import { AuthenticatedContext } from '../models';
import { GoogleExternalConnection } from '../models/ExternalConnection/GoogleExternalConnection';
import { ExternalConnectionOperations, AuthenticatedContextOperations } from '../operations';

@JsonController('/google_oauth')
export default class GoogleController {
  @Get('/redirect_url')
  public redirectUrl (
    @authenticatedContext() authContext: AuthenticatedContext
  ) {
    const authContextToken = AuthenticatedContextOperations.IntoToken.run({ authContext });

    const authUrl = createGoogleOauth2Client().generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive'],
      state: authContextToken,
      prompt: 'consent'
    });

    return authUrl;
  }

  @Get('/callback')
  @Redirect('/dashboard/organization')
  public async googleCallBack (
    @QueryParam('error') error: string,
    @QueryParam('state', { required: true }) state: string,
    @QueryParam('code', { required: true }) code: string
  ) {
    if ( error ) { 
      throw new BadRequestError(error);
    }

    const authContext = await AuthenticatedContextOperations.FromToken.run({ token: state });
    const googleOauth2Client = createGoogleOauth2Client();

    const { tokens } = await googleOauth2Client.getToken(code);

    if (!tokens.refresh_token || !tokens.access_token || !tokens.expiry_date) {
      throw new BadRequestError('Google oauth flow did not return required information');
    }
    
    const googleExternalConnection = new GoogleExternalConnection();
    googleExternalConnection.organizationId = authContext.getOrganizationId();
    googleExternalConnection.credentials = tokens;
    
    await ExternalConnectionOperations.Create.run({ model: googleExternalConnection });
    
    return true;
  }
}
