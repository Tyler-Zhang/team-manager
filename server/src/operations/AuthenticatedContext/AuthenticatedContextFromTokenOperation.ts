import { verify } from "jsonwebtoken";
import { AuthenticatedContext, AuthenticationType, IAuthenticatedContextConstructorProps } from "../../models";
import { secretsConfig } from '../../config';
import { AbstractOperation } from "../AbstractOperation";
import { ITokenPayload } from './IntoToken';

export interface IAuthenticatedContextFromTokenOperation {
  jwtToken: string
}

export class AuthenticatedContextFromTokenOperation extends AbstractOperation{
  public static run(args: IAuthenticatedContextFromTokenOperation): Promise<AuthenticatedContext> {
    return super.call(args);
  }

  private jwtToken: string;

  constructor({ jwtToken }: IAuthenticatedContextFromTokenOperation) {
    super();
    this.jwtToken = jwtToken;
  }

  public async run() {
    const payload: ITokenPayload = verify(this.jwtToken, secretsConfig.privateKey) as any;
    let authContextArgs: IAuthenticatedContextConstructorProps;

    if (payload.type === AuthenticationType.member) {
      authContextArgs = {
        type: AuthenticationType.member,
        authority: payload.authority,
        memberId: payload.memberId,
        organizationId: payload.organizationId
      };
    } else {
      authContextArgs = {
        type: AuthenticationType.system
      };
    }

    return new AuthenticatedContext(authContextArgs);
  }
}
