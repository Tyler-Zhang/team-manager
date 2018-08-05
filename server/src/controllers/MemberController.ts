import { Get, Post, Body, BadRequestError, JsonController, QueryParam } from "routing-controllers";
import { Organization, Member, AuthenticatedContext } from '../models';
import { MemberOperations, PositionOperations } from '../operations';
import { getManager } from "typeorm";
import authenticatedContext from "../authorization/authenticatedContext";

@JsonController('/members')
export class MemberController {
  @Post('')
  public async create(@Body({ required: true }) body: Member) {
    const organization = await Organization.findOne(body.id);

    if (!organization) {
      throw new BadRequestError('Organization does not exist');
    }

    /**
     * Split up the creation of the member, with it joining the different teams
     */
    const positions = body.positions;
    body.positions = [];

    await getManager().transaction(async entityManager => {
      body = await MemberOperations.Create.run({ model: body, entityManager });

      /**
       * Properly associated each position relation id
       */
      positions.forEach(position => { position.memberId = body.id });
      /**
       * Create the positions
       */
      body.positions = await Promise.all(positions.map((position) => PositionOperations.Create.run({ model: position, entityManager })));

    });

    return body;
  }

  @Get('')
  public async get(@QueryParam('organizationId') organizationId: number = 5) {
    return Member.find({
      where: { organizationId },
      relations: ['positions', 'positions.team']
    });
  }
}
