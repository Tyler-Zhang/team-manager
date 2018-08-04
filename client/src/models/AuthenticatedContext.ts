import { Authority } from "./Member";

export interface IAuthenticatedContext {
  authority: Authority;
  member: boolean;
  system: boolean;
  memberId: number;
  organizationId: number;
}
