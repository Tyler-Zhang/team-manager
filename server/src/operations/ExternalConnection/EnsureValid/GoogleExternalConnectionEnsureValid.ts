import { EnsureValid } from './EnsureValid';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { GoogleExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { externalConnectionConfig } from '../../../config';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionEnsureValid extends EnsureValid {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  protected model!: GoogleExternalConnection;

  protected async shouldRenew() {
    return (
      !this.model.isValid ||
      Math.abs(Date.now() - (this.model.credentials.expiry_date || 0)) < externalConnectionConfig.reauthPadding
    )
  }
}
