import { google } from 'googleapis';
import * as assert from 'assert';


assert.ok(process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_ID env must be set');
assert.ok(process.env.GOOGLE_CLIENT_SECRET, 'GOOGLE_CLIENT_SECRET env must be set');
assert.ok(process.env.HOST, 'HOST must be set');

export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${process.env.HOST}/api/google_oauth/callback`,
  webhookUri: `${process.env.HOST}/api/google/notify`,
  maxWebhookTTL: 24 * 60 * 60 * 1000
}

export const createGoogleOauth2Client = () => new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirectUri
);
