import { AuthenticatedContext, Member, IAuthenticatedContextConstructorProps, AuthenticationType } from "../../models";
import { AbstractOperation } from "../AbstractOperation";

export interface IFromMember {
  member: Member
}

export class FromMember extends AbstractOperation{
  public static run(args: IFromMember): Promise<AuthenticatedContext> {
    return super.call(args);
  }

  private member: Member;

  constructor({ member }: IFromMember) {
    super();
    this.member = member;
  }

  public async run() {
    const authConstructorProps: IAuthenticatedContextConstructorProps = {
      type: AuthenticationType.member,
      authority: this.member.authority,
      memberId: this.member.id,
      organizationId: this.member.organizationId
    }

    return new AuthenticatedContext(authConstructorProps);
  }
}
