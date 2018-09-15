import { GoogleDriveFileResource, GoogleExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { SyncToMember, IResourceSyncToMemberOperationArgs } from './SyncToMember';
import { drive_v3, google } from 'googleapis';

@Operation('GoogleDriveFileResource')
export class GoogleDriveFileSyncToMember extends SyncToMember<GoogleDriveFileResource> {
  public static run(args: IResourceSyncToMemberOperationArgs<GoogleDriveFileResource>) {
    return super.run(args);
  }

  private googleDriveClient!: drive_v3.Drive;

  protected async hydrateExternalConnectionForResource() {
    await super.hydrateExternalConnectionForResource();

    this.googleDriveClient = google.drive({
      version: 'v3',
      auth: (this.externalConnection as GoogleExternalConnection).toGoogleAuthClient()
    });
  }

  protected async doesMemberHaveAccessToResource() {
    return null;
  }

  protected async grantMemberAccessToResource() {
    return this.googleDriveClient.permissions.create({
      emailMessage: 'You have been granted permission to this file',
      sendNotificationEmail: true,
      fileId: this.model.externalId,
      requestBody: {
        emailAddress: this.member.email,
        role: 'writer',
        type: 'user'
      }
    });
  }

  protected async revokeMemberAccessToResource() {
    return;
  }
}
