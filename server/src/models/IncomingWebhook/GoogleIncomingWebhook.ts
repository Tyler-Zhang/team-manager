import { ChildEntity, ManyToOne, Column, Index} from 'typeorm';
import * as  uuid from 'uuid';
import { Model } from '../../lib/sti-model-operations';
import { GoogleExternalConnection, ExternalConnection } from '../ExternalConnection';
import { IncomingWebhook } from './IncomingWebhook';
import { googleConfig } from '../../config';

const TYPE = 'IncomingWebhook>GoogleIncomingWebhook';

@Model('GoogleIncomingWebhook')
@ChildEntity(TYPE)
export class GoogleIncomingWebhook extends IncomingWebhook {
  @ManyToOne(type => ExternalConnection)
  public externalConnection!: GoogleExternalConnection;

  public type = TYPE;

  public get address(): string {
    return this.data.address;
  }

  public set address(value: string) {
    this.data.address = value;
  }

  public get token(): string {
    return this.data.token;
  }

  public set token(value: string) {
    this.data.token = value;
  }

  public get resourceId(): string {
    return this.data.resourceId;
  }

  public set resourceId(value: string) {
    this.data.resourceId = value;
  }
  
  public get resourceUri(): string {
    return this.data.resourceUri;
  }

  public set resourceUri(value: string) {
    this.data.resourceUri = value;
  }

  constructor(){
    super();
    this.address = googleConfig.webhookUri;
    this.externalId = uuid.v4(); 
  }
}
