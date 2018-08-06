import { Post, Body, BadRequestError, JsonController, Get, QueryParam } from "routing-controllers";
import { Team, Organization, AuthenticatedContext } from '../models';
import { TeamOperations } from "../operations";
import authenticatedContext from "../authorization/authenticatedContext";

@JsonController('/teams')
export class TeamController {

  @Post('')
  public async create(
    @Body({ required: true }) body: Team,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    const organization = await Organization.findOne(authContext.getOrganizationId());

    if (!organization) {
      throw new BadRequestError('That organization does not exist');
    }
    body.organization = organization;
    return TeamOperations.Create.run({ model: body });
  }

  @Get('')
  public async get(
    @QueryParam('organizationId') organizationId: number | undefined,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    organizationId = organizationId || authContext.getOrganizationId();

    return Team.find({
      where: { organizationId },
      relations: ['positions']
    });
  }
}
