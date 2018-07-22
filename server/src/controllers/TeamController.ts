import { Post, Body, BadRequestError, JsonController } from "routing-controllers";
import { Team, Organization } from '../models';
import { TeamCreateOperation } from "../operations/Team/TeamCreateOperation";

@JsonController('/teams')
export class TeamController {

  @Post('')
  public async create(@Body({ required: true }) body: Team) {
    const organization = await Organization.findOne(body.organizationId);

    if (!organization) {
      throw new BadRequestError('That organization does not exist');
    }
    body.organization = organization;
    return TeamCreateOperation.run({ model: body });
  }
}