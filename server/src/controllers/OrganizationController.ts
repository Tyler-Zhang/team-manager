import { Post, Body, BadRequestError, JsonController } from "routing-controllers";
import { Organization } from '../models';

@JsonController('/organizations')
export class OrganizationController {
  @Post('')
  public async create(@Body({ required: true, validate: true}) body: Organization) {
    const existingOrganization = await Organization.findOne({ where: { name: body.name } });

    if (existingOrganization) {
      throw new BadRequestError('This organization name is already taken');
    }

    return body.save();
  }
}
