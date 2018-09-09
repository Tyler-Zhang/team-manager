import { AuthenticatedContext, Member, IAuthenticatedContextConstructorProps, AuthenticationType } from "../../models";
import { ApplicationOperation } from "../ApplicationOperation";
import { Operation } from "../../lib/sti-model-operations/Operation";

export interface IFromMember {
  member: Member
}

@Operation('AuthenticatedContext')
export class FromMember extends ApplicationOperation {
  public static run(args: IFromMember): Promise<AuthenticatedContext> {
    return super.run(args);
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
