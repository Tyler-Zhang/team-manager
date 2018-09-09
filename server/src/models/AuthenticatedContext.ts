import { Authority } from "./Member";
import { equal } from "assert";
import { Model } from "../lib/sti-model-operations";

export enum AuthenticationType {
  member = 'member',
  system = 'system'
}

export interface IAuthenticatedContextMemberConstructorProps {
  type: AuthenticationType.member;
  memberId: number;
  organizationId: number;
  authority: Authority;
}

export interface IAuthenticatedContextSystemConstructorProps {
  type: AuthenticationType.system;
}

export type IAuthenticatedContextConstructorProps =
  IAuthenticatedContextMemberConstructorProps |
  IAuthenticatedContextSystemConstructorProps;

@Model('AuthenticatedContext')
export class AuthenticatedContext {
  // Will always be defined as it differentiates the type of context
  private system: boolean;
  private member: boolean;

  // Only defined if the auth context is a member context
  private memberId?: number;
  private organizationId?: number;
  private authority?: Authority;

  constructor(options: IAuthenticatedContextConstructorProps) {
    if (options.type === AuthenticationType.member) {
      this.system = false;
      this.member = true;
      this.memberId = options.memberId;
      this.organizationId = options.organizationId;
      this.authority = options.authority;
    } else {
      this.system = true;
      this.member = false;
    }
  }

  public isSystem() {
    return this.system;
  }

  public isMember() {
    return this.member;
  }

  public getMemberId() {
    equal(this.isMember(), true, 'Can only get memberId on a member auth context');
    return this.memberId as number;
  }

  public getOrganizationId() {
    equal(this.isMember(), true, 'Can only get organizationId on a member auth context');
    return this.organizationId as number;
  }

  public getAuthority() {
    equal(this.isMember(), true, 'Can only get authority on a member auth context');
    return this.authority as Authority;
  }
}
