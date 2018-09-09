import { verify } from "jsonwebtoken";
import { AuthenticatedContext, AuthenticationType, IAuthenticatedContextConstructorProps } from "../../models";
import { secretsConfig } from '../../config';
import { ApplicationOperation } from "../ApplicationOperation";
import { ITokenPayload } from './IntoToken';
import { Operation } from "../../lib/AutoOperation";

export interface IFromToken {
  token: string
}

@Operation('AuthenticatedContext')
export class FromToken extends ApplicationOperation{
  public static run(args: IFromToken): Promise<AuthenticatedContext> {
    return super.run(args);
  }

  private jwtToken: string;

  constructor({ token }: IFromToken) {
    super();
    this.jwtToken = token;
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
