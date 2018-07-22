import { Organization, Member } from '../models';

export class CreateOrganizationRequest {
  public organization!: Organization;
  public member!: Member;
}
