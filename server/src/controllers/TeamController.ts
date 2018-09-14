import { Post, Body, BadRequestError, JsonController, Get, QueryParam, Param, Delete, NotFoundError, HttpCode, Patch, UnauthorizedError } from "routing-controllers";
import { Team, Organization, AuthenticatedContext } from '../models';
import { TeamOperations, PositionOperations } from "../operations";
import authenticatedContext from "../authorization/authenticatedContext";
import { getManager } from "typeorm";

@JsonController('/teams')
export class TeamController {

  @Post('')
  public async create(
    @Body({ required: true }) team: Team,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    const organization = await Organization.findOne(authContext.getOrganizationId());

    if (!organization) {
      throw new BadRequestError('That organization does not exist');
    }

    team.organization = organization;

    /**
     * Split up the creation of the member, with it joining the different teams
     */
    const positions = team.positions || [];
    team.positions = [];

    return getManager().transaction(async entityManager => {
      team = await TeamOperations.Create.run({ model: team, entityManager });

      /**
       * Properly associated each position relation id
       */
      positions.forEach(position => { position.teamId = team.id });
      /**
       * Create the positions
       */
      team.positions = await Promise.all(positions.map((position) =>
        PositionOperations.Create.run({ model: position, entityManager }))
      );

      return team;
    });

  }

  @Get('')
  public async get(
    @QueryParam('organizationId') organizationId: number | undefined,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    organizationId = organizationId || authContext.getOrganizationId();

    return Team.find({
      where: { organizationId },
      relations: ['positions', 'resources']
    });
  }

  @Patch('/:id')
  public async patch(
    @QueryParam('id') teamId: number,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext,
    @Body({ required: true }) teamChanges: Partial<Team>
  ) {
    const team = await Team.findOne(teamId, {
      relations: ['positions', 'resources']
    });

    if (!team) {
      throw new BadRequestError('This team does not exist');
    }

    if (team.organizationId !== authContext.getOrganizationId()) {
      throw new UnauthorizedError('You must be a part of the organization to patch the team');
    }

    return TeamOperations.Patch.run({ model: team, changes: teamChanges });
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(
    @Param('id') teamId: number,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    const team = await Team.findOne(teamId);

    if (!team) {
      throw new NotFoundError();
    }

    await TeamOperations.Delete.run({ model: team });

    return null;
  }
}
