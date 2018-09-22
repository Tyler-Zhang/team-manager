import { AuthenticatedContext, Authority } from "../../models";
import { sign } from "jsonwebtoken";
import { secretsConfig } from '../../config';
import { ApplicationOperation } from "../ApplicationOperation";
import { Operation } from "../../lib/sti-model-operations/Operation";

export interface IMemberTokenPayload {
  type: 'member',
  memberId: number,
  organizationId: number,
  authority: Authority
}

export interface ISystemTokenPayload {
  type: 'system'
}

export type ITokenPayload = IMemberTokenPayload | ISystemTokenPayload;

export interface IIntoToken {
  authContext: AuthenticatedContext
}

@Operation('AuthenticatedContext')
export class IntoToken extends ApplicationOperation {
  public static run(args: IIntoToken): Promise<string> {
    return super.run(args);
  }

  private authContext: AuthenticatedContext;

  constructor({ authContext }: IIntoToken) {
    super();
    this.authContext = authContext
  }

  public run() {
    let payload: ITokenPayload;

    if (this.authContext.isSystem()) {
      payload = {
        type: 'system'
      };
    } else {
      payload = {
        type: 'member',
        authority: this.authContext.getAuthority(),
        memberId: this.authContext.getMemberId(),
        organizationId: this.authContext.getOrganizationId()
      };
    }
    return sign(payload, secretsConfig.privateKey);
  }
}
