import { AuthenticatedContext, Authority } from "../../models";
import { sign } from "jsonwebtoken";
import { secretsConfig } from '../../config';
import { AbstractOperation } from "../AbstractOperation";

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

export class IntoToken extends AbstractOperation{
  public static run(args: IIntoToken): string {
    return super.run(args);
  }

  private authContext: AuthenticatedContext;

  constructor({ authContext }: IIntoToken) {
    super();
    this.authContext = authContext
  }

  public run() {
    let payload: ITokenPayload;

    if (this.authContext.isMember) {
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
