import { Organization, Member } from '../models';
import { Type } from 'class-transformer';

export class CreateOrganizationRequest {
  @Type(() => Organization)
  public organization!: Organization;

  @Type(() => Member)
  public member!: Member;
}
